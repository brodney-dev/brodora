import "reflect-metadata";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { NestFactory } from "@nestjs/core";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import icon from "../../resources/icon.png?asset";
import type { BrodoraParentUserRow } from "../shared/brodora-parent";
import {
	IPC_FETCH_BRODORA_USER,
	IPC_TEST_APP_BRODORA_USER,
} from "../shared/brodora-parent-channels";
import {
	connectBrodoraParentEvents,
	fetchBrodoraParentUser,
	isSessionUserPayload,
} from "./brodora-parent-ipc";
import { AppModule } from "./modules/app.module";

/** Latest user from Brodora; pushed to renderer when it changes. */
let latestBrodoraParentUser: BrodoraParentUserRow | null = null;

function sendBrodoraUserToAllWindows(): void {
	for (const win of BrowserWindow.getAllWindows()) {
		if (win.isDestroyed()) {
			continue;
		}
		win.webContents.send(IPC_TEST_APP_BRODORA_USER, latestBrodoraParentUser);
	}
}

function sendBrodoraUserToWindow(webContents: Electron.WebContents): void {
	webContents.send(IPC_TEST_APP_BRODORA_USER, latestBrodoraParentUser);
}

async function refreshBrodoraUserFromSessionPayload(
	payload: unknown,
): Promise<void> {
	if (isSessionUserPayload(payload)) {
		try {
			latestBrodoraParentUser = await fetchBrodoraParentUser(payload.id);
		} catch {
			latestBrodoraParentUser = null;
		}
	} else {
		latestBrodoraParentUser = null;
	}
	sendBrodoraUserToAllWindows();
}

/** ESM preload build emits `index.mjs`; dev / legacy CJS uses `index.js`. */
function resolvePreloadPath(): string {
	const dir = join(__dirname, "../preload");
	const mjs = join(dir, "index.mjs");
	if (existsSync(mjs)) {
		return mjs;
	}
	return join(dir, "index.js");
}

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: resolvePreloadPath(),
			sandbox: false,
		},
	});

	mainWindow.on("ready-to-show", () => {
		mainWindow.show();
	});

	mainWindow.webContents.once("did-finish-load", () => {
		sendBrodoraUserToWindow(mainWindow.webContents);
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: "deny" };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
	// Set app user model id for windows
	electronApp.setAppUserModelId("com.electron");

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	ipcMain.on("ping", () => console.log("pong"));

	ipcMain.handle(
		IPC_FETCH_BRODORA_USER,
		async (_event, id: unknown): Promise<BrodoraParentUserRow> => {
			if (typeof id !== "number" || !Number.isInteger(id) || id < 1) {
				throw new Error("Invalid user id");
			}
			const user = await fetchBrodoraParentUser(id);
			latestBrodoraParentUser = user;
			sendBrodoraUserToAllWindows();
			return user;
		},
	);

	const nestApp = await NestFactory.createApplicationContext(
		AppModule.forRoot(app.getPath("userData")),
		{ logger: ["verbose", "debug", "log", "warn", "error", "fatal"] },
	);

	app.on("before-quit", () => {
		void nestApp.close();
	});

	if (process.env["BRODORA_HTTP_PORT"]) {
		connectBrodoraParentEvents((topic, payload) => {
			console.log("[Brodora parent] push", topic, payload);
			if (topic === "sessionUser") {
				void refreshBrodoraUserFromSessionPayload(payload);
			}
		});
		// Bootstrap: load user 1 if present until a session push arrives.
		void fetchBrodoraParentUser(1)
			.then((user) => {
				latestBrodoraParentUser = user;
				sendBrodoraUserToAllWindows();
			})
			.catch(() => {
				/* no default user — wait for sessionUser */
			});
	}

	createWindow();

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the main process when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code and require them here.
