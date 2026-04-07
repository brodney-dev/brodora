import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DevService } from "./dev.service";
import { DevApp } from "./dev-app.entity";

@Module({
	imports: [TypeOrmModule.forFeature([DevApp])],
	providers: [DevService],
})
export class DevModule {}
