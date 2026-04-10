import type { MigrationInterface, QueryRunner } from "typeorm";

export class AppInstallsTable1775318970106 implements MigrationInterface {
	name = "AppInstallsTable1775318970106";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "app_installs" (
				"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
				"app_id" varchar NOT NULL,
				"installed_path" varchar NOT NULL,
				"version" varchar NOT NULL,
				"snapshot_hash" varchar NOT NULL,
				"installed_at" varchar NOT NULL,
				"updated_at" varchar NOT NULL
			)
		`);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "app_installs_app_id" ON "app_installs" ("app_id")`,
		);
		await queryRunner.query(`
			ALTER TABLE "library_apps" ADD COLUMN "app_install_id" integer NULL
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "library_apps" DROP COLUMN "app_install_id"`,
		);
		await queryRunner.query(`DROP INDEX IF EXISTS "app_installs_app_id"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "app_installs"`);
	}
}
