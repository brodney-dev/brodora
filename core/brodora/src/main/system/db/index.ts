import { mkdirSync } from "node:fs";
import { join } from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { runMigrations } from "./migrations-manager";

export type AppDatabase = ReturnType<typeof drizzle>;

export type BrodoraDatabase = {
	database: AppDatabase;
	sqlite: Database.Database;
};

export interface InitDatabaseOptions {
	/** Usually `app.getPath("userData")`. The DB file lives in `<userDataDir>/storage/`. */
	userDataDir: string;
}

/**
 * Opens SQLite in WAL mode, runs pending up migrations, and caches the Drizzle client.
 * Call once from the main process after `app.whenReady()`.
 */
export function initDatabase(options: InitDatabaseOptions): {
	database: AppDatabase;
	sqlite: Database.Database;
} {
	const storageDir = join(options.userDataDir, "storage");
	mkdirSync(storageDir, { recursive: true });
	const dbPath = join(storageDir, "brodora.sqlite");
	const raw = new Database(dbPath);
	raw.pragma("journal_mode = WAL");

	runMigrations(raw);

	return {
		database: drizzle(raw),
		sqlite: raw,
	};
}
