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

	@Column({ name: "source_type", type: "varchar" })
	sourceType!: string;

	@Column({ name: "source_ref", type: "varchar" })
	sourceRef!: string;

	@Column({ name: "manifest", type: "varchar" })
	manifest!: string; // JSON stringified app.brodora contents

	@Column({ name: "manifest_hash", type: "varchar" })
	manifestHash!: string; // hash of manifest for quick change detection

	@Column({ name: "added_at", type: "varchar" })
	addedAt!: string;
}
