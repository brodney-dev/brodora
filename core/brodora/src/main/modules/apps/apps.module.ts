import { Module } from "@nestjs/common";
import { DevModule } from "./dev/dev.module";
import { LibraryModule } from "./library/library.module";

@Module({
	imports: [LibraryModule, DevModule],
})
export class AppsModule {}
