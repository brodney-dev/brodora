import { type DynamicModule, Module } from "@nestjs/common";
import { AppLauncherModule } from "./app-launcher/app-launcher.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";

@Module({})
export class AppModule {
	static forRoot(userDataDir: string): DynamicModule {
		return {
			module: AppModule,
			imports: [
				DatabaseModule.forRoot(userDataDir),
				UsersModule,
				AppLauncherModule,
			],
		};
	}
}
