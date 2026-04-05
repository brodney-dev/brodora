import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserLoggedIn1775318970102 implements MigrationInterface {
	name = "AddUserLoggedIn1775318970102";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "users" ADD COLUMN "loggedIn" boolean NOT NULL DEFAULT 0
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "users" DROP COLUMN "loggedIn"
		`);
	}
}
