import { BrowserWindow } from "electron";
import {
	BRODORA_IPC_LAUNCHED_APPS_CHANGED,
	type LaunchedAppsState,
} from "../../../shared/api/launched-apps";

export function broadcastLaunchedAppsState(payload: LaunchedAppsState): void {
	for (const win of BrowserWindow.getAllWindows()) {
		if (win.isDestroyed()) {
			continue;
		}
		win.webContents.send(BRODORA_IPC_LAUNCHED_APPS_CHANGED, payload);
	}
}
