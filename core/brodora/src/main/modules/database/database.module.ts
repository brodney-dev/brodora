import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { type DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { app } from "electron";
import { DevApp } from "../apps/dev/dev-app.entity";
import { LibraryApp } from "../apps/library/library-app.entity";
import { User } from "../users/user.entity";

@Module({})
export class DatabaseModule {
	static forRoot(userDataDir: string): DynamicModule {
		const storageDir = join(userDataDir, "storage");
		const database = join(storageDir, "brodora.sqlite");
		const isDev = !app.isPackaged;

		return {
			global: true,
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					useFactory: () => {
						mkdirSync(storageDir, { recursive: true });
						return {
							type: "better-sqlite3" as const,
							database,
							entities: [User, LibraryApp, DevApp],
							migrations: isDev
								? ["src/main/migrations/*.ts"]
								: ["dist/main/migrations/*.js"],
							migrationsTableName: "migrations",
							synchronize: false,
							migrationsRun: true,
							logging: false,
							enableWAL: true,
						};
					},
				}),
			],
			exports: [TypeOrmModule],
		};
	}
}
