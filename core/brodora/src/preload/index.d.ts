import type { ElectronAPI } from "@electron-toolkit/preload";
import type { CallableBrodoraApi } from "./api";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: typeof CallableBrodoraApi;
	}
}
