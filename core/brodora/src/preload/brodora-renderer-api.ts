import type { SessionUserState } from "../shared/api/session-user";

export type BrodoraRendererIpc = {
	/**
	 * Subscribe to server-driven session updates (login, logout, etc.).
	 * @returns Unsubscribe function.
	 */
	onUserChanged: (callback: (user: SessionUserState) => void) => () => void;
};
