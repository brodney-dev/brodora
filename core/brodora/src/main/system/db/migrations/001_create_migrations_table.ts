import type Database from "better-sqlite3";

export const name = "001_create_migrations_table";

export function up(db: Database.Database): void {
	db.exec(`
		CREATE TABLE migrations (
			name TEXT PRIMARY KEY NOT NULL
		);
	`);
}

export function down(db: Database.Database): void {
	db.exec("DROP TABLE IF EXISTS migrations;");
}
