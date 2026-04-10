import type { MigrationInterface, QueryRunner } from "typeorm";

export class DevAppsTable1775318970104 implements MigrationInterface {
	name = "DevAppsTable1775318970104";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "dev_apps" (
				"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
				"app_id" varchar NOT NULL,
				"name" varchar NOT NULL,
				"source_path" varchar NOT NULL,
				"dev_script" varchar NOT NULL,
				"added_at" varchar NOT NULL,
				CONSTRAINT "UQ_dev_apps_app_id" UNIQUE ("app_id")
			)
		`);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "dev_apps_added_at" ON "dev_apps" ("added_at")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX IF EXISTS "dev_apps_added_at"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "dev_apps"`);
	}
}
