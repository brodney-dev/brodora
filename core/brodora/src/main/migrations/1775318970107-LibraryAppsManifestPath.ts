import type { MigrationInterface, QueryRunner } from "typeorm";

export class LibraryAppsManifestPath1775318970107
	implements MigrationInterface
{
	name = "LibraryAppsManifestPath1775318970107";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "library_apps" ADD COLUMN "manifest_path" varchar
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "library_apps" DROP COLUMN "manifest_path"`,
		);
	}
}
