import { Module } from "@nestjs/common";
import { AppLauncherService } from "./app-launcher.service";

@Module({
	providers: [AppLauncherService],
	exports: [AppLauncherService],
})
export class AppLauncherModule {}
