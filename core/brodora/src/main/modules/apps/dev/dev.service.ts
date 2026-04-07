import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrowserWindow, dialog } from "electron";
import type { Repository } from "typeorm";
import { ZodError } from "zod";
import { BrodoraApi } from "../../../../shared/api";
import type {
	AddDevAppFromDialogResult,
	DevAppRow,
} from "../../../../shared/api/apps.api";
import { handleBrodoraApi } from "../../../system/api/api";
import { type DevManifest, parseDevManifest } from "../utils/manifest";
import { DevApp } from "./dev-app.entity";

@Injectable()
export class DevService implements OnModuleInit {
	private readonly logger = new Logger(DevService.name);

	constructor(
		@InjectRepository(DevApp)
		private readonly devAppRepo: Repository<DevApp>,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.apps.listDevApps, async () =>
			this.listDevApps(),
		);
		handleBrodoraApi(BrodoraApi.apps.addDevAppFromDialog, async () =>
			this.addDevAppFromDialog(),
		);
	}

	async listDevApps(): Promise<DevAppRow[]> {
		const rows = await this.devAppRepo.find({
			order: { addedAt: "DESC" },
		});
		return rows.map((r) => this.toRow(r));
	}

	async addDevAppFromDialog(): Promise<AddDevAppFromDialogResult> {
		const parentWindow = BrowserWindow.getFocusedWindow();
		const dialogOptions = {
			title: "Select app.brodora",
			buttonLabel: "Add app",
			filters: [{ name: "Brodora app manifest", extensions: ["brodora"] }],
			properties: ["openFile" as const],
		};
		const { canceled, filePaths } = await (parentWindow
			? dialog.showOpenDialog(parentWindow, dialogOptions)
			: dialog.showOpenDialog(dialogOptions));
		if (canceled || filePaths.length === 0) {
			return { ok: false, reason: "cancelled" };
		}

		const filePath = filePaths[0];
		let raw: string;
		try {
			raw = readFileSync(filePath, "utf8");
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.logger.warn(`addDevAppFromDialog read failed: ${message}`);
			return { ok: false, reason: "read_error" };
		}

		let manifest: DevManifest;
		try {
			manifest = parseDevManifest(raw);
		} catch (err) {
			if (err instanceof ZodError) {
				this.logger.warn(
					`addDevAppFromDialog invalid manifest: ${err.message}`,
				);
				return { ok: false, reason: "invalid_manifest" };
			}
			const message = err instanceof Error ? err.message : String(err);
			this.logger.warn(`addDevAppFromDialog parse failed: ${message}`);
			return { ok: false, reason: "invalid_manifest" };
		}

		const existing = await this.devAppRepo.findOne({
			where: { appId: manifest.appId },
		});
		if (existing) {
			return { ok: false, reason: "duplicate_app_id" };
		}

		const sourcePath = dirname(filePath);
		const addedAt = new Date().toISOString();
		const row = this.devAppRepo.create({
			appId: manifest.appId,
			name: manifest.name,
			sourcePath,
			devScript: manifest.devScript,
			addedAt,
		});
		const saved = await this.devAppRepo.save(row);
		return { ok: true, row: this.toRow(saved) };
	}

	private toRow(r: DevApp): DevAppRow {
		return {
			id: r.id,
			appId: r.appId,
			name: r.name,
			sourcePath: r.sourcePath,
			devScript: r.devScript,
			addedAt: r.addedAt,
		};
	}
}
