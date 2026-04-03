import { MigrationApi } from "./migration.api";
import { SettingsApi } from "./settings.api";

export const BrodoraApi = {
	settings: SettingsApi,
	migration: MigrationApi,
};
