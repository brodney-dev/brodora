import type { MigrationInterface, QueryRunner } from "typeorm";

export class LibraryAppsTable1775318970103 implements MigrationInterface {
	name = "LibraryAppsTable1775318970103";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "library_apps" (
				"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
				"user_id" integer NOT NULL,
				"app_id" varchar NOT NULL,
				"name" varchar NOT NULL,
				"source_type" varchar NOT NULL,
				"source_ref" varchar NOT NULL,
				"added_at" varchar NOT NULL,
				CONSTRAINT "FK_library_apps_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
			)
		`);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "library_apps_user_id" ON "library_apps" ("user_id")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX IF EXISTS "library_apps_user_id"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "library_apps"`);
	}
}
