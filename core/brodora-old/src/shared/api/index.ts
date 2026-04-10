import { AppsApi } from "./apps.api";
import { LauncherApi } from "./launcher.api";
import { UsersApi } from "./users.api";

export const BrodoraApi = {
	users: UsersApi,
	apps: AppsApi,
	launcher: LauncherApi,
};
