import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Inject, Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, type Repository } from "typeorm";
import { BrodoraApi } from "../../../../shared/api";
import { InstallLibraryAppResult } from "../../../../shared/api/apps.api";
import { handleBrodoraApi } from "../../../system/api/api";
import { AppLauncherService } from "../../app-launcher/app-launcher.service";
import { User } from "../../users/user.entity";
import { LibraryApp } from "../library/library-app.entity";
import { AppInstall } from "./app-install.entity";
import { BRODORA_USER_DATA_DIR } from "./brodora-user-data.token";

function sanitizeAppInstallSegment(appId: string): string {
	return appId.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

/** Skip `.git` (and anything under it) to avoid huge / sensitive copies. */
function copyFilter(source: string): boolean {
	const segments = source.replaceAll("\\", "/").split("/");
	return !segments.some((s) => s === ".git");
}

@Injectable()
export class InstallsService implements OnModuleInit {
	private readonly logger = new Logger(InstallsService.name);

	constructor(
		@Inject(BRODORA_USER_DATA_DIR)
		private readonly userDataDir: string,
		@InjectRepository(AppInstall)
		private readonly appInstallRepo: Repository<AppInstall>,
		@InjectRepository(LibraryApp)
		private readonly libraryAppRepo: Repository<LibraryApp>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@Inject(AppLauncherService)
		private readonly launcher: AppLauncherService,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(
			BrodoraApi.apps.installLibraryApp,
			async ({ libraryAppId }) => this.installLocalLibraryApp(libraryAppId),
		);
		handleBrodoraApi(
			BrodoraApi.apps.launchLibraryApp,
			async ({ libraryAppId }) => this.launchInstalledLibraryApp(libraryAppId),
		);
	}

	/**
	 * Local library apps only: copies project root (`dirname(source_ref)`) into
	 * `userData/apps/<userId>/<appId>/lib`, then records `app_installs.installed_path` as that `lib` dir.
	 */
	async installLocalLibraryApp(
		libraryAppId: number,
	): Promise<InstallLibraryAppResult> {
		const session = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!session) {
			return { ok: false, reason: "not_logged_in" };
		}

		const library = await this.libraryAppRepo.findOne({
			where: { id: libraryAppId, userId: session.id },
			relations: { appInstall: true },
		});
		if (!library) {
			return { ok: false, reason: "not_found" };
		}
		if (library.sourceType !== "local") {
			this.logger.warn(
				`installLibraryApp: sourceType=${library.sourceType} is not supported yet`,
			);
			return { ok: false, reason: "not_local" };
		}
		if (library.appInstall != null) {
			return { ok: false, reason: "already_installed" };
		}

		let manifestJson: { version?: string };
		try {
			manifestJson = JSON.parse(library.manifest) as { version?: string };
		} catch {
			return { ok: false, reason: "invalid_manifest" };
		}
		const version =
			typeof manifestJson.version === "string" ? manifestJson.version : "0.0.0";

		const sourceRoot = dirname(library.sourceRef);
		try {
			const st = await stat(sourceRoot);
			if (!st.isDirectory()) {
				return { ok: false, reason: "source_missing" };
			}
		} catch {
			return { ok: false, reason: "source_missing" };
		}

		const appSegment = sanitizeAppInstallSegment(library.appId);
		const installSlot = join(
			this.userDataDir,
			"apps",
			String(session.id),
			appSegment,
		);
		const installedPath = join(installSlot, "lib");

		try {
			await mkdir(installSlot, { recursive: true });
			await rm(installedPath, { recursive: true, force: true });
			await cp(sourceRoot, installedPath, {
				recursive: true,
				filter: (src) => copyFilter(src),
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.error(`installLocalLibraryApp copy failed: ${message}`);
			return { ok: false, reason: "copy_failed" };
		}

		const now = new Date().toISOString();

		const install = this.appInstallRepo.create({
			appId: library.appId,
			installedPath,
			version,
			snapshotHash: library.manifestHash,
			installedAt: now,
			updatedAt: now,
		});
		const saved = await this.appInstallRepo.save(install);
		library.appInstall = saved;
		await this.libraryAppRepo.save(library);

		return { ok: true };
	}

	async launchInstalledLibraryApp(libraryAppId: number): Promise<boolean> {
		const session = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!session) {
			return false;
		}

		const library = await this.libraryAppRepo.findOne({
			where: { id: libraryAppId, userId: session.id },
			relations: { appInstall: true },
		});
		if (!library?.appInstall) {
			return false;
		}

		try {
			this.launcher.launch(library.appInstall.installedPath, library.name);
			return true;
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.error(`launchInstalledLibraryApp failed: ${message}`);
			return false;
		}
	}
}
