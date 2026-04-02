import type Database from "better-sqlite3";
import type { Migration } from "./migration-types";

function loadMigrationsFromModules(): Migration[] {
	const modules = import.meta.glob("./migrations/*.ts", {
		eager: true,
	}) as Record<string, Migration>;

	return Object.values(modules)
		.map((m) => ({
			name: m.name,
			up: m.up,
			down: m.down,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

function getAppliedNames(db: Database.Database): Set<string> {
	try {
		const rows = db.prepare("SELECT name FROM migrations").all() as {
			name: string;
		}[];
		return new Set(rows.map((r) => r.name));
	} catch {
		/* table missing until first migration runs */
		return new Set();
	}
}

/**
 * Runs each migration whose `name` is not in `migrations`, in order (by exported `name`).
 * After a successful `up()`, the name is inserted into `migrations`.
 */
export function runMigrations(db: Database.Database): void {
	const migrations = loadMigrationsFromModules();
	const applied = getAppliedNames(db);
	const pending = migrations.filter((m) => !applied.has(m.name));

	for (const m of pending) {
		db.transaction(() => {
			m.up(db);
			db.prepare("INSERT INTO migrations (name) VALUES (?)").run(m.name);
		})();
	}
}

/**
 * Runs `down()` and removes the row. Use with care: rolling back an early migration
 * can break later ones that depend on it.
 */
export function rollbackMigration(db: Database.Database, name: string): void {
	const migrations = loadMigrationsFromModules();
	const m = migrations.find((x) => x.name === name);
	if (!m) {
		throw new Error(`Unknown migration: ${name}`);
	}
	db.transaction(() => {
		m.down(db);
		db.prepare("DELETE FROM migrations WHERE name = ?").run(name);
	})();
}
