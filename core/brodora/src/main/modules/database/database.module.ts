import { type DynamicModule, Global, Module } from "@nestjs/common";
import { initDatabase } from "../../system/db/index";
import { BRODORA_DATABASE } from "./database.tokens";

@Global()
@Module({})
export class DatabaseModule {
	static forRoot(userDataDir: string): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,
			providers: [
				{
					provide: BRODORA_DATABASE,
					useFactory: () => initDatabase({ userDataDir }),
				},
			],
			exports: [BRODORA_DATABASE],
		};
	}
}
