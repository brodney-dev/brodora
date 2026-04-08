import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrowserWindow, dialog } from "electron";
import { IsNull, type Repository } from "typeorm";
import { ZodError } from "zod";
import { BrodoraApi } from "../../../../shared/api";
import type {
	AddLocalLibraryAppFromDialogResult,
	LibraryAppRow,
} from "../../../../shared/api/apps.api";
import { handleBrodoraApi } from "../../../system/api/api";
import { User } from "../../users/user.entity";
import { type AppManifest, parseAppManifest } from "../utils/manifest";
import { LibraryApp } from "./library-app.entity";

@Injectable()
export class LibraryService implements OnModuleInit {
	private readonly logger = new Logger(LibraryService.name);

	constructor(
		@InjectRepository(LibraryApp)
		private readonly libraryAppRepo: Repository<LibraryApp>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.apps.listLibraryApps, async () =>
			this.listLibraryAppsForCurrentUser(),
		);
		handleBrodoraApi(BrodoraApi.apps.addLocalLibraryAppFromDialog, async () =>
			this.addLocalLibraryAppFromDialog(),
		);
	}

	async listLibraryAppsForCurrentUser(): Promise<LibraryAppRow[]> {
		const session = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!session) {
			return [];
		}
		const rows = await this.libraryAppRepo.find({
			where: { userId: session.id },
			relations: { appInstall: true },
			order: { addedAt: "DESC" },
		});
		return rows.map((r) => this.toRow(r));
	}

	/**
	 * Picks `app.brodora`, validates app manifest, resolves `sourceRef` to the absolute
	 * directory containing `main` (e.g. `dist` for `dist/main.js`), and inserts `library_apps`.
	 */
	async addLocalLibraryAppFromDialog(): Promise<AddLocalLibraryAppFromDialogResult> {
		const session = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!session) {
			return { ok: false, reason: "not_logged_in" };
		}

		const parentWindow = BrowserWindow.getFocusedWindow();
		const dialogOptions = {
			title: "Add app to library — select app.brodora",
			buttonLabel: "Add to library",
			filters: [{ name: "Brodora app manifest", extensions: ["brodora"] }],
			properties: ["openFile" as const],
		};
		const { canceled, filePaths } = await (parentWindow
			? dialog.showOpenDialog(parentWindow, dialogOptions)
			: dialog.showOpenDialog(dialogOptions));
		if (canceled || filePaths.length === 0) {
			return { ok: false, reason: "cancelled" };
		}

		const manifestPath = filePaths[0];
		let raw: string;
		try {
			raw = readFileSync(manifestPath, "utf8");
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.warn(`addLocalLibraryAppFromDialog read failed: ${message}`);
			return { ok: false, reason: "read_error" };
		}

		let manifest: AppManifest;
		try {
			manifest = parseAppManifest(raw);
		} catch (err) {
			if (err instanceof ZodError) {
				this.logger.warn(
					`addLocalLibraryAppFromDialog invalid manifest: ${err.message}`,
				);
				return { ok: false, reason: "invalid_manifest" };
			}
			const message = err instanceof Error ? err.message : String(err);
			this.logger.warn(`addLocalLibraryAppFromDialog parse failed: ${message}`);
			return { ok: false, reason: "invalid_manifest" };
		}

		const existing = await this.libraryAppRepo.findOne({
			where: { userId: session.id, appId: manifest.appId },
		});
		if (existing) {
			return { ok: false, reason: "duplicate_app_id" };
		}

		const projectRoot = dirname(manifestPath);
		const mainRelativeDir = dirname(manifest.main);
		const sourceRef = resolve(projectRoot, mainRelativeDir);

		const manifestJson = JSON.stringify(manifest);
		const manifestHash = createHash("sha256")
			.update(manifestJson, "utf8")
			.digest("hex");

		const addedAt = new Date().toISOString();
		const row = this.libraryAppRepo.create({
			userId: session.id,
			appId: manifest.appId,
			name: manifest.name,
			sourceType: "local",
			sourceRef,
			manifestPath,
			manifest: manifestJson,
			manifestHash,
			addedAt,
		});
		const saved = await this.libraryAppRepo.save(row);
		return { ok: true, row: this.toRow(saved) };
	}

	private toRow(r: LibraryApp): LibraryAppRow {
		const inst = r.appInstall;
		return {
			id: r.id,
			userId: r.userId,
			appId: r.appId,
			name: r.name,
			sourceType: r.sourceType,
			sourceRef: r.sourceRef,
			manifestPath: r.manifestPath ?? null,
			manifest: r.manifest,
			manifestHash: r.manifestHash,
			addedAt: r.addedAt,
			install:
				inst != null
					? {
							id: inst.id,
							installedPath: inst.installedPath,
							version: inst.version,
							snapshotHash: inst.snapshotHash,
							installedAt: inst.installedAt,
							updatedAt: inst.updatedAt,
						}
					: null,
			updateAvailable: inst != null && r.manifestHash !== inst.snapshotHash,
		};
	}
}
