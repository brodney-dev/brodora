import "./zod-jitless";
import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import type { BrodoraParentUserRow } from "../shared/brodora-parent";
import {
	IPC_FETCH_BRODORA_USER,
	IPC_TEST_APP_BRODORA_USER,
} from "../shared/brodora-parent-channels";

const brodoraParent = {
	fetchUserById: (id: number): Promise<BrodoraParentUserRow> =>
		ipcRenderer.invoke(IPC_FETCH_BRODORA_USER, id),
	onUserUpdated: (
		callback: (user: BrodoraParentUserRow | null) => void,
	): (() => void) => {
		const listener = (
			_event: Electron.IpcRendererEvent,
			user: BrodoraParentUserRow | null,
		) => {
			callback(user);
		};
		ipcRenderer.on(IPC_TEST_APP_BRODORA_USER, listener);
		return () => {
			ipcRenderer.removeListener(IPC_TEST_APP_BRODORA_USER, listener);
		};
	},
};

async function exposePreloadBridge(): Promise<void> {
	const api = { brodoraParent };

	if (process.contextIsolated) {
		try {
			contextBridge.exposeInMainWorld("electron", electronAPI);
			contextBridge.exposeInMainWorld("api", api);
		} catch (error) {
			console.error(error);
		}
	} else {
		// @ts-expect-error (define in dts)
		window.electron = electronAPI;
		// @ts-expect-error (define in dts)
		window.api = api;
	}
}

await exposePreloadBridge();
