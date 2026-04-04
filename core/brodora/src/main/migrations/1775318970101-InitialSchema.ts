import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1740787200000 implements MigrationInterface {
	name = "InitialSchema1740787200000";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "users" (
				"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
				"name" varchar NOT NULL,
				"createdAt" varchar NOT NULL,
				"updatedAt" varchar NOT NULL,
				"deletedAt" varchar NULL,
				"lastAccessed" varchar NULL
			)
		`);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "users_deleted_at" ON "users" ("deletedAt")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX IF EXISTS "users_deleted_at"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
	}
}
