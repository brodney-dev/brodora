import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { AppInstall } from "../installs/app-install.entity";

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

	/** Absolute path to the `.brodora` file when added (used to resolve `platforms.*`). */
	@Column({ name: "manifest_path", type: "varchar", nullable: true })
	manifestPath!: string | null;

	@Column({ name: "manifest", type: "varchar" })
	manifest!: string; // JSON stringified app.brodora contents

	@Column({ name: "manifest_hash", type: "varchar" })
	manifestHash!: string; // hash of manifest for quick change detection

	@ManyToOne(() => AppInstall, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "app_install_id" })
	appInstall?: AppInstall | null;

	@Column({ name: "added_at", type: "varchar" })
	addedAt!: string;
}
