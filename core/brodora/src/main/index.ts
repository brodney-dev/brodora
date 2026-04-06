import "reflect-metadata";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import icon from "../../resources/icon.png?asset";
import { AppModule } from "./modules/app.module";

const BRODORA_HTTP_PORT_ENV = "BRODORA_HTTP_PORT";
const DEFAULT_BRODORA_HTTP_PORT = 19842;

function resolveListenPort(): number {
	const raw = process.env[BRODORA_HTTP_PORT_ENV];
	if (raw === undefined || raw === "") {
		return DEFAULT_BRODORA_HTTP_PORT;
	}
	const n = Number(raw);
	if (!Number.isInteger(n) || n < 1 || n > 65535) {
		return DEFAULT_BRODORA_HTTP_PORT;
	}
	return n;
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

	const port = resolveListenPort();
	const nestApp = await NestFactory.create(
		AppModule.forRoot(app.getPath("userData")),
		{ logger: ["verbose", "debug", "log", "warn", "error", "fatal"] },
	);
	nestApp.useWebSocketAdapter(new WsAdapter(nestApp));
	nestApp.enableCors({ origin: true });
	await nestApp.listen(port, "127.0.0.1");
	process.env[BRODORA_HTTP_PORT_ENV] = String(port);

	app.on("before-quit", () => {
		void nestApp.close();
	});

	createWindow();

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
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
// code. You can also put them in separate files and require them here.
