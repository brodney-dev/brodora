import type { ElectronAPI } from "@electron-toolkit/preload";

export interface BrodoraPreloadAPI {
	migration: {
		listApplied: () => Promise<string[]>;
	};
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: BrodoraPreloadAPI;
	}
}
