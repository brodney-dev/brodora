import type Database from "better-sqlite3";

export type Migration = {
	/** Unique name stored in `migrations` (e.g. 001_create_migrations_table). */
	name: string;
	up: (db: Database.Database) => void;
	down: (db: Database.Database) => void;
};
