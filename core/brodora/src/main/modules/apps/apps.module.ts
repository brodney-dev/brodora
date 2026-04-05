import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { AppsService } from "./apps.service";
import { LibraryApp } from "./library-app.entity";

@Module({
	imports: [TypeOrmModule.forFeature([LibraryApp, User])],
	providers: [AppsService],
})
export class AppsModule {}
