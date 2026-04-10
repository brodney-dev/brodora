import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../users/user.entity";
import { LibraryService } from "./library.service";
import { LibraryApp } from "./library-app.entity";

@Module({
	imports: [TypeOrmModule.forFeature([LibraryApp, User])],
	providers: [LibraryService],
})
export class LibraryModule {}
