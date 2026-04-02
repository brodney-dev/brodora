import type { MainContext } from "../../system/types/context";
import { Module } from "../../system/types/module";
import { MigrationService } from "./migration.service";

export class MigrationModule extends Module {
	private readonly migrationService: MigrationService;
	constructor(ctx: MainContext) {
		super(ctx);
		this.migrationService = new MigrationService(ctx.brodoraDatabase);
	}
}
