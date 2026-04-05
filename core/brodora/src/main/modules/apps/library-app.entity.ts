import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("library_apps")
export class LibraryApp {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: "user_id", type: "integer" })
	userId!: number;

	@Column({ name: "app_id", type: "varchar" })
	appId!: string;

	@Column({ type: "varchar" })
	name!: string;

	@Column({ type: "varchar" })
	type!: string;

	@Column({ name: "source_ref", type: "varchar" })
	sourceRef!: string;

	@Column({ name: "added_at", type: "varchar" })
	addedAt!: string;
}
