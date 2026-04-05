import { Injectable, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, type Repository } from "typeorm";
import { BrodoraApi } from "../../../shared/api";
import type { LibraryAppRow } from "../../../shared/api/apps.api";
import { handleBrodoraApi } from "../../system/api/api";
import { User } from "../users/user.entity";
import { LibraryApp } from "./library-app.entity";

@Injectable()
export class AppsService implements OnModuleInit {
	constructor(
		@InjectRepository(LibraryApp)
		private readonly libraryAppRepo: Repository<LibraryApp>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.apps.listLibraryApps, async () =>
			this.listLibraryAppsForCurrentUser(),
		);
	}

	async listLibraryAppsForCurrentUser(): Promise<LibraryAppRow[]> {
		const session = await this.userRepo.findOne({
			where: { loggedIn: true, deletedAt: IsNull() },
		});
		if (!session) {
			return [];
		}
		const rows = await this.libraryAppRepo.find({
			where: { userId: session.id },
			order: { addedAt: "DESC" },
		});
		return rows.map((r) => this.toRow(r));
	}

	private toRow(r: LibraryApp): LibraryAppRow {
		return {
			id: r.id,
			userId: r.userId,
			appId: r.appId,
			name: r.name,
			type: r.type,
			sourceRef: r.sourceRef,
			addedAt: r.addedAt,
		};
	}
}
