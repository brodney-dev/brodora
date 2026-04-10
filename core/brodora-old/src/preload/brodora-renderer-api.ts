import type { LaunchedAppsState } from "../shared/api/launched-apps";
import type { SessionUserState } from "../shared/api/session-user";

export type BrodoraRendererIpc = {
	/**
	 * Subscribe to server-driven session updates (login, logout, etc.).
	 * @returns Unsubscribe function.
	 */
	onUserChanged: (callback: (user: SessionUserState) => void) => () => void;
	/** Subscribe to child app launcher updates (spawn / exit). */
	onLaunchedAppsChanged: (
		callback: (apps: LaunchedAppsState) => void,
	) => () => void;
};
