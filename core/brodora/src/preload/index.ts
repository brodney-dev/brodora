import "./zod-jitless";
import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";
import { CallableBrodoraApi } from "./api";

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", CallableBrodoraApi);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-expect-error (define in dts)
	window.electron = electronAPI;
	// @ts-expect-error (define in dts)
	window.api = CallableBrodoraApi;
}
