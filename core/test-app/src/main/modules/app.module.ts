import { type DynamicModule, Module } from "@nestjs/common";

@Module({})
export class AppModule {
	static forRoot(_userDataDir: string): DynamicModule {
		return {
			module: AppModule,
			imports: [],
		};
	}
}
