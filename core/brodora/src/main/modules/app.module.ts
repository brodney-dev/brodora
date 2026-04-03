import { type DynamicModule, Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { MigrationModule } from "./migration/migration.module";
import { SettingsModule } from "./settings/settings.module";

@Module({})
export class AppModule {
	static forRoot(userDataDir: string): DynamicModule {
		return {
			module: AppModule,
			imports: [
				DatabaseModule.forRoot(userDataDir),
				MigrationModule,
				SettingsModule,
			],
		};
	}
}
