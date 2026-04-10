import type { Stats } from "node:fs";
import { chmod, copyFile, cp, mkdir, rm, stat } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { Inject, Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, type Repository } from "typeorm";
import { BrodoraApi } from "../../../../shared/api";
import {
	type InstallLibraryAppResult,
	type UninstallLibraryAppResult,
} from "../../../../shared/api/apps.api";
import { handleBrodoraApi } from "../../../system/api/api";
import { AppLauncherService } from "../../app-launcher/app-launcher.service";
import { User } from "../../users/user.entity";
import { LibraryApp } from "../library/library-app.entity";
import {
	type AppManifest,
	inferManifestDirFromSourceRefAndMain,
	parseAppManifest,
	resolvePlatformRefFromManifestDir,
} from "../utils/manifest";
import { AppInstall } from "./app-install.entity";
import { BRODORA_USER_DATA_DIR } from "./brodora-user-data.token";

function sanitizeAppInstallSegment(appId: string): string {
	return appId.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

/** `userData/storage/<userId>/apps/<appId>/` — install tree or AppImage lives here. */
function libraryAppInstallRoot(
	userDataDir: string,
	userId: number,
	appId: string,
): string {
	return join(
		userDataDir,
		"storage",
		String(userId),
		"apps",
		sanitizeAppInstallSegment(appId),
	);
}

/** Skip `.git` (and anything under it) to avoid huge / sensitive copies. */
function copyFilter(source: string): boolean {
	const segments = source.replaceAll("\\", "/").split("/");
	return !segments.some((s) => s === ".git");
}

function currentPlatformKey(): "linux" | "mac" | "win" {
	if (process.platform === "win32") {
		return "win";
	}
	if (process.platform === "darwin") {
		return "mac";
	}
	return "linux";
}

function isAppImageRef(ref: string): boolean {
	return ref.toLowerCase().endsWith(".appimage");
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
			BrodoraApi.apps.uninstallLibraryApp,
			async ({ libraryAppId }) => this.uninstallLocalLibraryApp(libraryAppId),
		);
		handleBrodoraApi(
			BrodoraApi.apps.launchLibraryApp,
			async ({ libraryAppId }) => this.launchInstalledLibraryApp(libraryAppId),
		);
	}

	/**
	 * Local library apps: on Linux, if `platforms.linux` points at a local `.AppImage`
	 * (relative to the manifest file), copies it into `storage/<userId>/apps/<appId>/`.
	 * Otherwise copies the project tree into `.../lib` for `electron .` launches.
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

		let manifest: AppManifest;
		try {
			manifest = parseAppManifest(library.manifest);
		} catch {
			return { ok: false, reason: "invalid_manifest" };
		}

		let loose: { version?: string };
		try {
			loose = JSON.parse(library.manifest) as { version?: string };
		} catch {
			return { ok: false, reason: "invalid_manifest" };
		}
		const version = typeof loose.version === "string" ? loose.version : "0.0.0";

		const plat = currentPlatformKey();
		const platformRef = manifest.platforms[plat];
		const manifestDir =
			library.manifestPath != null && library.manifestPath.length > 0
				? dirname(library.manifestPath)
				: inferManifestDirFromSourceRefAndMain(
						library.sourceRef,
						manifest.main,
					);

		const installSlot = libraryAppInstallRoot(
			this.userDataDir,
			session.id,
			library.appId,
		);

		if (
			process.platform === "linux" &&
			platformRef != null &&
			platformRef.length > 0
		) {
			if (/^https?:\/\//i.test(platformRef)) {
				return { ok: false, reason: "remote_installer_not_supported" };
			}
			if (isAppImageRef(platformRef)) {
				const sourceAppImage = resolvePlatformRefFromManifestDir(
					manifestDir,
					platformRef,
				);
				let imgStat: Stats;
				try {
					imgStat = await stat(sourceAppImage);
				} catch {
					return { ok: false, reason: "installer_missing" };
				}
				if (!imgStat.isFile()) {
					return { ok: false, reason: "installer_missing" };
				}

				const dest = join(installSlot, basename(sourceAppImage));
				try {
					await mkdir(installSlot, { recursive: true });
					await copyFile(sourceAppImage, dest);
					await chmod(dest, 0o755);
				} catch (err) {
					const message = err instanceof Error ? err.message : String(err);
					this.logger.error(
						`installLocalLibraryApp AppImage copy failed: ${message}`,
					);
					return { ok: false, reason: "copy_failed" };
				}

				const now = new Date().toISOString();
				const install = this.appInstallRepo.create({
					appId: library.appId,
					installedPath: dest,
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
		}

		const sourceRoot = dirname(library.sourceRef);
		try {
			const st = await stat(sourceRoot);
			if (!st.isDirectory()) {
				return { ok: false, reason: "source_missing" };
			}
		} catch {
			return { ok: false, reason: "source_missing" };
		}

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

	/**
	 * Deletes `storage/<userId>/apps/<appId>/`, clears `library_apps.app_install_id`, and
	 * deletes the `app_installs` row.
	 */
	async uninstallLocalLibraryApp(
		libraryAppId: number,
	): Promise<UninstallLibraryAppResult> {
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
			return { ok: false, reason: "not_local" };
		}
		if (library.appInstall == null) {
			return { ok: false, reason: "not_installed" };
		}

		const installSlot = libraryAppInstallRoot(
			this.userDataDir,
			session.id,
			library.appId,
		);

		try {
			await rm(installSlot, { recursive: true, force: true });
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.error(`uninstallLocalLibraryApp cleanup failed: ${message}`);
			return { ok: false, reason: "cleanup_failed" };
		}

		const installId = library.appInstall.id;
		library.appInstall = null;
		await this.libraryAppRepo.save(library);
		await this.appInstallRepo.delete(installId);

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
			this.launcher.launchInstalledLibraryApp(
				library.appInstall.installedPath,
				library.name,
			);
			return true;
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.error(`launchInstalledLibraryApp failed: ${message}`);
			return false;
		}
	}
}
