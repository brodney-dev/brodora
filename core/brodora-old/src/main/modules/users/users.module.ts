import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "../events/events.module";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [TypeOrmModule.forFeature([User]), EventsModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
