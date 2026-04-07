import { type DynamicModule, Module } from "@nestjs/common";
import { AppLauncherModule } from "./app-launcher/app-launcher.module";
import { AppsModule } from "./apps/apps.module";
import { InstallsModule } from "./apps/installs/installs.module";
import { DatabaseModule } from "./database/database.module";
import { EventsModule } from "./events/events.module";
import { UsersModule } from "./users/users.module";

@Module({})
export class AppModule {
	static forRoot(userDataDir: string): DynamicModule {
		return {
			module: AppModule,
			imports: [
				DatabaseModule.forRoot(userDataDir),
				EventsModule,
				UsersModule,
				AppsModule,
				InstallsModule.forRoot(userDataDir),
				AppLauncherModule,
			],
		};
	}
}
