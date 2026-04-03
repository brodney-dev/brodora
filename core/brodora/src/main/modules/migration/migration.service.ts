import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import { MigrationApi } from "../../../shared/api/migration.api";
import type { BrodoraDatabase } from "../../system/db";
import { handleBrodoraApi } from "../../system/types/api";
import { BRODORA_DATABASE } from "../database/database.tokens";

@Injectable()
export class MigrationService implements OnModuleInit {
	constructor(
		@Inject(BRODORA_DATABASE) private readonly brodoraDatabase: BrodoraDatabase,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(MigrationApi.isMigrated, () => {
			return this.isMigrated();
		});
		handleBrodoraApi(MigrationApi.isMigrationApplied, ({ name }) => {
			return this.isMigrationApplied(name);
		});
	}

	/** Names recorded in the `migrations` table (applied ups), sorted. */
	isMigrationApplied(name: string): boolean {
		const { sqlite } = this.brodoraDatabase;
		const rows = sqlite
			.prepare("SELECT name FROM migrations ORDER BY name COLLATE NOCASE")
			.all() as { name: string }[];
		return rows.some((r) => r.name === name);
	}

	isMigrated(): boolean {
		const { sqlite } = this.brodoraDatabase;
		const rows = sqlite
			.prepare("SELECT name FROM migrations ORDER BY name COLLATE NOCASE")
			.all() as { name: string }[];
		return rows.length > 0;
	}
}
