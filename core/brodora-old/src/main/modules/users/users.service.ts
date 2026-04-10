import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { BrodoraApi } from "../../../shared/api";
import { SessionUserState } from "../../../shared/api/session-user";
import { UserRow } from "../../../shared/api/users.api";
import { handleBrodoraApi } from "../../system/api/api";
import { broadcastSessionUserState } from "../../system/ipc/broadcast-session-user";
import { EventsService } from "../events/events.service";
import { User } from "./user.entity";

@Injectable()
export class UsersService implements OnModuleInit {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly events: EventsService,
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
		handleBrodoraApi(BrodoraApi.users.getLoggedIn, async () =>
			this.getLoggedInSession(),
		);
		handleBrodoraApi(BrodoraApi.users.setLoggedIn, async ({ id }) => {
			return this.setLoggedInUser(id);
		});
		handleBrodoraApi(BrodoraApi.users.logout, async () => {
			await this.clearAllLoggedIn();
			return true as const;
		});
	}

	/** Active users (not soft-deleted), best default first: recent `lastAccessed`, then `id`. */
	async list(): Promise<UserRow[]> {
		const rows = await this.userRepo.find();
		return rows.map(this.toRow);
	}

	async create(name: string): Promise<UserRow> {
		const now = new Date().toISOString();
		const entity = this.userRepo.create({
			name,
			createdAt: now,
			updatedAt: now,
			deletedAt: null,
			lastAccessed: now,
			loggedIn: true,
		});
		const saved = await this.userRepo.save(entity);
		const row = this.toRow(saved);
		this.publishSessionUser({ id: row.id, name: row.name });
		return row;
	}

	async recordAccess(id: number): Promise<void> {
		const now = new Date().toISOString();
		await this.userRepo.update(
			{ id, deletedAt: IsNull() },
			{ lastAccessed: now, updatedAt: now },
		);
	}

	/** Active (non–soft-deleted) user by id, or `null`. */
	async getById(id: number): Promise<UserRow | null> {
		const entity = await this.userRepo.findOne({
			where: { id, deletedAt: IsNull() },
		});
		if (!entity) {
			return null;
		}
		return this.toRow(entity);
	}

	async getLoggedInSession(): Promise<{ id: number; name: string } | null> {
		const row = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!row) {
			return null;
		}
		return { id: row.id, name: row.name };
	}

	/** Ensures only this user has `loggedIn === true`. */
	async setLoggedInUser(id: number): Promise<boolean> {
		const active = await this.userRepo.findOne({
			where: { id, deletedAt: IsNull() },
		});
		if (!active) {
			return false;
		}
		const now = new Date().toISOString();
		await this.userRepo
			.createQueryBuilder()
			.update(User)
			.set({ loggedIn: false })
			.execute();
		await this.userRepo.update(
			{ id, deletedAt: IsNull() },
			{ loggedIn: true, updatedAt: now },
		);
		this.publishSessionUser({ id, name: active.name });
		return true;
	}

	async clearAllLoggedIn(): Promise<void> {
		const now = new Date().toISOString();
		await this.userRepo
			.createQueryBuilder()
			.update(User)
			.set({ loggedIn: false, updatedAt: now })
			.execute();
		this.publishSessionUser(null);
	}

	private publishSessionUser(payload: SessionUserState): void {
		broadcastSessionUserState(payload);
		this.events.broadcast("sessionUser", payload);
	}

	private toRow(u: User): UserRow {
		return {
			id: u.id,
			name: u.name,
			createdAt: u.createdAt,
			updatedAt: u.updatedAt,
			deletedAt: u.deletedAt,
			lastAccessed: u.lastAccessed,
			loggedIn: Boolean(u.loggedIn),
		};
	}
}
