import type { ElectronAPI } from "@electron-toolkit/preload";
import type { SessionUserState } from "../shared/api/session-user";
import type { CallableBrodoraApi } from "./api";
import type { BrodoraRendererIpc } from "./brodora-renderer-api";

export type BrodoraWindowApi = typeof CallableBrodoraApi & {
	ipc: BrodoraRendererIpc;
};

declare global {
	interface Window {
		electron: ElectronAPI;
		api: BrodoraWindowApi;
		__initialState: {
			user: SessionUserState;
		};
	}
}
