import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("app_installs")
export class AppInstall {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: "app_id", type: "varchar" })
	appId!: string;

	@Column({ name: "installed_path", type: "varchar" })
	installedPath!: string;

	@Column({ type: "varchar" })
	version!: string;

	@Column({ name: "snapshot_hash", type: "varchar" })
	snapshotHash!: string;

	@Column({ name: "installed_at", type: "varchar" })
	installedAt!: string;

	@Column({ name: "updated_at", type: "varchar" })
	updatedAt!: string;
}
