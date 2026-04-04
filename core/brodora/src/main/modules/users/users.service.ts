import { Injectable, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, type Repository } from "typeorm";
import { BrodoraApi } from "../../../shared/api";
import type { UserRow } from "../../../shared/api/users.api";
import { handleBrodoraApi } from "../../system/api/api";
import { User } from "./user.entity";

@Injectable()
export class UsersService implements OnModuleInit {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.users.list, async () => this.list());
		handleBrodoraApi(BrodoraApi.users.create, async ({ name }) =>
			this.create(name.trim()),
		);
		handleBrodoraApi(BrodoraApi.users.recordAccess, async ({ id }) => {
			await this.recordAccess(id);
			return true as const;
		});
	}

	/** Active users (not soft-deleted), best default first: recent `lastAccessed`, then `id`. */
	async list(): Promise<UserRow[]> {
		const rows = await this.userRepo.find();
		return rows;
	}

	async create(name: string): Promise<UserRow> {
		const now = new Date().toISOString();
		const entity = this.userRepo.create({
			name,
			createdAt: now,
			updatedAt: now,
			deletedAt: null,
			lastAccessed: now,
		});
		const saved = await this.userRepo.save(entity);
		return this.toRow(saved);
	}

	async recordAccess(id: number): Promise<void> {
		const now = new Date().toISOString();
		await this.userRepo.update(
			{ id, deletedAt: IsNull() },
			{ lastAccessed: now, updatedAt: now },
		);
	}

	private toRow(u: User): UserRow {
		return {
			id: u.id,
			name: u.name,
			createdAt: u.createdAt,
			updatedAt: u.updatedAt,
			deletedAt: u.deletedAt,
			lastAccessed: u.lastAccessed,
		};
	}
}
