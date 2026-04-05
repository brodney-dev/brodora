import "./zod-jitless";
import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import * as O from "fp-ts/Option";
import { BrodoraApi } from "../shared/api";
import {
	BRODORA_IPC_LAUNCHED_APPS_CHANGED,
	launchedAppsListSchema,
} from "../shared/api/launched-apps";
import {
	BRODORA_IPC_USER_CHANGED,
	type SessionUserState,
	sessionUserStateSchema,
} from "../shared/api/session-user";
import { CallableBrodoraApi } from "./api";
import type { BrodoraRendererIpc } from "./brodora-renderer-api";

function parseSessionFromInvoke(raw: unknown): SessionUserState {
	const parsed = BrodoraApi.users.getLoggedIn.validateOutput(raw);
	if (O.isNone(parsed)) {
		return null;
	}
	return parsed.value;
}

const brodoraIpc: BrodoraRendererIpc = {
	onUserChanged(callback) {
		const listener = (_event: Electron.IpcRendererEvent, payload: unknown) => {
			const result = sessionUserStateSchema.safeParse(payload);
			if (result.success) {
				callback(result.data);
			}
		};
		ipcRenderer.on(BRODORA_IPC_USER_CHANGED, listener);
		return () => {
			ipcRenderer.removeListener(BRODORA_IPC_USER_CHANGED, listener);
		};
	},
	onLaunchedAppsChanged(callback) {
		const listener = (_event: Electron.IpcRendererEvent, payload: unknown) => {
			const result = launchedAppsListSchema.safeParse(payload);
			if (result.success) {
				callback(result.data);
			}
		};
		ipcRenderer.on(BRODORA_IPC_LAUNCHED_APPS_CHANGED, listener);
		return () => {
			ipcRenderer.removeListener(BRODORA_IPC_LAUNCHED_APPS_CHANGED, listener);
		};
	},
};
async function exposePreloadBridge(): Promise<void> {
	const userRaw = await ipcRenderer.invoke(
		BrodoraApi.users.getLoggedIn.getKey(),
		undefined,
	);
	const user = parseSessionFromInvoke(userRaw);

	const api = {
		...CallableBrodoraApi,
		ipc: brodoraIpc,
	};

	if (process.contextIsolated) {
		try {
			contextBridge.exposeInMainWorld("electron", electronAPI);
			contextBridge.exposeInMainWorld("api", api);
			contextBridge.exposeInMainWorld("__initialState", { user });
		} catch (error) {
			console.error(error);
		}
	} else {
		// @ts-expect-error (define in dts)
		window.electron = electronAPI;
		// @ts-expect-error (define in dts)
		window.api = api;
		// @ts-expect-error (define in dts)
		window.__initialState = { user };
	}
}

await exposePreloadBridge();
