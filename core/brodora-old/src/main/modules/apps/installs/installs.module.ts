import { type DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppLauncherModule } from "../../app-launcher/app-launcher.module";
import { User } from "../../users/user.entity";
import { LibraryApp } from "../library/library-app.entity";
import { AppInstall } from "./app-install.entity";
import { BRODORA_USER_DATA_DIR } from "./brodora-user-data.token";
import { InstallsService } from "./installs.service";

@Module({})
export class InstallsModule {
	static forRoot(userDataDir: string): DynamicModule {
		return {
			module: InstallsModule,
			imports: [
				TypeOrmModule.forFeature([AppInstall, LibraryApp, User]),
				AppLauncherModule,
			],
			providers: [
				InstallsService,
				{ provide: BRODORA_USER_DATA_DIR, useValue: userDataDir },
			],
			exports: [InstallsService],
		};
	}
}
