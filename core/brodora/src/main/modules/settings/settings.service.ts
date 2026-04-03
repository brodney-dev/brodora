import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import { BrodoraApi } from "../../../shared/api";
import type { BrodoraDatabase } from "../../system/db";
import { handleBrodoraApi } from "../../system/types/api";
import { BRODORA_DATABASE } from "../database/database.tokens";

export type SettingRow = { key: string; value: string };

@Injectable()
export class SettingsService implements OnModuleInit {
	constructor(
		@Inject(BRODORA_DATABASE) private readonly brodoraDatabase: BrodoraDatabase,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.settings.getAll, () => this.getAll());
		handleBrodoraApi(BrodoraApi.settings.set, ({ key, value }) => {
			this.set(key, value);
			return true as const;
		});
	}

	getAll(): SettingRow[] {
		const { sqlite } = this.brodoraDatabase;
		const rows = sqlite
			.prepare<[], SettingRow>(
				"SELECT key, value FROM settings ORDER BY key COLLATE NOCASE",
			)
			.all();
		return rows;
	}

	set(key: string, value: string): void {
		const { sqlite } = this.brodoraDatabase;
		sqlite
			.prepare(
				`
				INSERT INTO settings (key, value) VALUES (?, ?)
				ON CONFLICT(key) DO UPDATE SET value = excluded.value
			`,
			)
			.run(key, value);
	}
}
