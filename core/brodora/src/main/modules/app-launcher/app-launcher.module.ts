import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DevApp } from "../apps/dev/dev-app.entity";
import { AppLauncherService } from "./app-launcher.service";

@Module({
	imports: [TypeOrmModule.forFeature([DevApp])],
	providers: [AppLauncherService],
	exports: [AppLauncherService],
})
export class AppLauncherModule {}
