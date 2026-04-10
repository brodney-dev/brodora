import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dev_apps")
export class DevApp {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: "app_id", type: "varchar" })
	appId!: string;

	@Column({ type: "varchar" })
	name!: string;

	@Column({ name: "source_path", type: "varchar" })
	sourcePath!: string;

	@Column({ name: "dev_script", type: "varchar" })
	devScript!: string;

	@Column({ name: "added_at", type: "varchar" })
	addedAt!: string;
}
