import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	createdAt!: string;

	@Column("varchar")
	updatedAt!: string;

	@Column("varchar", { nullable: true })
	deletedAt!: string | null;

	@Column("varchar", { nullable: true })
	lastAccessed!: string | null;

	@Column("boolean", { default: false })
	loggedIn!: boolean;
}
