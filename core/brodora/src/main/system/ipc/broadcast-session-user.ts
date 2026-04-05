import { BrowserWindow } from "electron";
import {
	BRODORA_IPC_USER_CHANGED,
	type SessionUserState,
} from "../../../shared/api/session-user";

export function broadcastSessionUserState(payload: SessionUserState): void {
	for (const win of BrowserWindow.getAllWindows()) {
		if (win.isDestroyed()) {
			continue;
		}
		win.webContents.send(BRODORA_IPC_USER_CHANGED, payload);
	}
}
