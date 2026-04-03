import type Database from "better-sqlite3";

export const name = "002_create_settings_table";

export function up(db: Database.Database): void {
	db.exec(`
		CREATE TABLE settings (
			key TEXT PRIMARY KEY NOT NULL,
			value TEXT NOT NULL
		);
		CREATE UNIQUE INDEX settings_key_unique ON settings (key);
	`);
}

export function down(db: Database.Database): void {
	db.exec(`
		DROP INDEX IF EXISTS settings_key_unique;
		DROP TABLE IF EXISTS settings;
	`);
}
