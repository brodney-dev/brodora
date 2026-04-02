import { initDatabase } from "../system/db";
import type { MainContext } from "../system/types/context";
import type { Module } from "../system/types/module";
import { MigrationModule } from "./migration/migration.module";

const Modules: (typeof Module)[] = [MigrationModule];
/**
 * Root module for the Electron main process (Nest-style bootstrap).
 * Add further `MigrationModule.register(ctx)`-style calls here as the app grows.
 */
export const AppModule = {
	bootstrap(userDataDir: string): MainContext {
		const brodoraDatabase = initDatabase({ userDataDir });

		const ctx: MainContext = { brodoraDatabase };

		Modules.forEach((Module) => {
			new Module(ctx);
		});

		return ctx;
	},
};
