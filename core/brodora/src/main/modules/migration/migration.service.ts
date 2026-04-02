import type { BrodoraDatabase } from "../../system/db";
import { handleInternalApi } from "../../system/types/api";
import { MigrationApi } from "./migration.api";

export class MigrationService {
	constructor(private readonly brodoraDatabase: BrodoraDatabase) {}

	public registerApis(): void {
		handleInternalApi(MigrationApi.isMigrated, () => {
			return this.isMigrated();
		});
		handleInternalApi(MigrationApi.isMigrationApplied, ({ name }) => {
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
