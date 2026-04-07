import type { MigrationInterface, QueryRunner } from "typeorm";

export class LibraryAppsManifestColumns1775318970105
	implements MigrationInterface
{
	name = "LibraryAppsManifestColumns1775318970105";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "library_apps" ADD COLUMN "manifest" varchar NOT NULL DEFAULT ''
		`);
		await queryRunner.query(`
			ALTER TABLE "library_apps" ADD COLUMN "manifest_hash" varchar NOT NULL DEFAULT ''
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "library_apps" DROP COLUMN "manifest_hash"`,
		);
		await queryRunner.query(
			`ALTER TABLE "library_apps" DROP COLUMN "manifest"`,
		);
	}
}
