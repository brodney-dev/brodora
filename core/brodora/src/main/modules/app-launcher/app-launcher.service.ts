import { type ChildProcess, spawn } from "node:child_process";
import { join } from "node:path";
import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { BrodoraApi } from "../../../shared/api";
import { handleBrodoraApi } from "../../system/api/api";

/**
 * Spawns another Electron app as a child process (same `electron` binary as Brodora).
 * `cwd` must be an app root with `package.json` whose `main` points at the built main script.
 */
/** Inherited from the parent Brodora `electron-vite dev` process; would load the wrong renderer. */
const DEV_ENV_KEYS_TO_STRIP_FOR_CHILD = ["ELECTRON_RENDERER_URL"] as const;

@Injectable()
export class AppLauncherService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(AppLauncherService.name);
	private child: ChildProcess | null = null;

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.launcher.launchTestApp, async () => {
			try {
				this.launch();
				return true;
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				this.logger.error(`launchTestApp failed: ${message}`);
				return false;
			}
		});
	}

	/**
	 * @param appRoot - Directory to pass as `cwd` for `electron .` (default: monorepo `core/test-app`).
	 */
	launch(appRoot: string = this.defaultTestAppRoot()): ChildProcess {
		if (this.child && !this.child.killed) {
			this.logger.warn("Replacing existing child app process");
			this.child.kill("SIGTERM");
			this.child = null;
		}

		const electronBinary = process.execPath;

		this.logger.log(`Launching app at ${appRoot}`);

		// Linux: child Electron otherwise requires chrome-sandbox owned by root (4755).
		// Matches local dev (`electron-vite dev -- --no-sandbox`).
		const electronArgs =
			process.platform === "linux" ? ["--no-sandbox", "."] : ["."];

		const proc = spawn(electronBinary, electronArgs, {
			cwd: appRoot,
			env: this.envForLaunchedApp(),
			stdio: ["ignore", "pipe", "pipe"],
			detached: false,
		});

		proc.stdout?.on("data", (chunk: Buffer) => {
			this.logger.debug(`[child stdout] ${chunk.toString().trimEnd()}`);
		});
		proc.stderr?.on("data", (chunk: Buffer) => {
			this.logger.warn(`[child stderr] ${chunk.toString().trimEnd()}`);
		});
		proc.on("error", (err) => {
			this.logger.error(`Child process error: ${err.message}`);
		});
		proc.on("exit", (code, signal) => {
			this.logger.log(`Child exited code=${code} signal=${signal ?? ""}`);
			if (this.child === proc) {
				this.child = null;
			}
		});

		this.child = proc;
		return proc;
	}

	/**
	 * Drop parent dev-server URLs so the child loads `out/renderer/index.html` from its own
	 * `cwd` instead of Brodora's Vite URL (which yields a blank or wrong UI).
	 */
	private envForLaunchedApp(): NodeJS.ProcessEnv {
		const env = { ...process.env };
		for (const key of DEV_ENV_KEYS_TO_STRIP_FOR_CHILD) {
			delete env[key];
		}
		return env;
	}

	/** `core/test-app` next to `core/brodora` (from `out/main/index.js`, three levels up to `core`). */
	defaultTestAppRoot(): string {
		return join(__dirname, "..", "..", "..", "test-app");
	}

	onModuleDestroy(): void {
		if (this.child && !this.child.killed) {
			this.child.kill("SIGTERM");
			this.child = null;
		}
	}
}
