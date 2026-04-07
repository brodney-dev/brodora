import { type ChildProcess, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { BrodoraApi } from "../../../shared/api";
import {
	LaunchedApp,
	LaunchedAppMode,
} from "../../../shared/api/launched-apps";
import { handleBrodoraApi } from "../../system/api/api";
import { DevApp } from "../apps/dev/dev-app.entity";

/**
 * Spawns another Electron app as a child process (same `electron` binary as Brodora).
 * `cwd` must be an app root with `package.json` whose `main` points at the built main script.
 */
/** Inherited from the parent Brodora `electron-vite dev` process; would load the wrong renderer. */
const DEV_ENV_KEYS_TO_STRIP_FOR_CHILD = ["ELECTRON_RENDERER_URL"] as const;

type TrackedProcess = {
	proc: ChildProcess;
	label: string;
	mode: LaunchedAppMode;
	appRoot: string;
};

@Injectable()
export class AppLauncherService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(AppLauncherService.name);
	private readonly processes = new Map<string, TrackedProcess>();

	constructor(
		@InjectRepository(DevApp)
		private readonly devAppRepo: Repository<DevApp>,
	) {}

	onModuleInit(): void {
		handleBrodoraApi(BrodoraApi.launcher.getLaunchedApps, async () =>
			this.getSnapshot(),
		);
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
		handleBrodoraApi(BrodoraApi.launcher.launchTestAppDev, async () => {
			try {
				this.launchDev();
				return true;
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				this.logger.error(`launchTestAppDev failed: ${message}`);
				return false;
			}
		});
		handleBrodoraApi(BrodoraApi.launcher.launchDevApp, async ({ devAppId }) => {
			try {
				return await this.launchDevAppById(devAppId);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				this.logger.error(`launchDevApp failed: ${message}`);
				return false;
			}
		});
	}

	/**
	 * @param appRoot - Directory to pass as `cwd` for `electron .` (default: monorepo `core/test-app`).
	 */
	launch(appRoot: string = this.defaultTestAppRoot()): ChildProcess {
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

		this.registerProcess(proc, {
			label: "Test app",
			mode: "production",
			appRoot,
		});

		return proc;
	}

	/**
	 * Runs `npm run <devScript>` in `appRoot`. Strips parent's `ELECTRON_RENDERER_URL` so
	 * electron-vite (or similar) sets URLs for this app only.
	 */
	launchDevAt(appRoot: string, devScript: string, label: string): ChildProcess {
		this.logger.log(`Launching dev (npm run ${devScript}) at ${appRoot}`);

		const proc = spawn("npm", ["run", devScript], {
			cwd: appRoot,
			env: this.envForLaunchedApp(),
			stdio: ["ignore", "pipe", "pipe"],
			detached: false,
		});

		this.registerProcess(proc, {
			label,
			mode: "development",
			appRoot,
		});

		return proc;
	}

	/** Runs `npm run dev` in `appRoot` (default: monorepo test app). */
	launchDev(appRoot: string = this.defaultTestAppRoot()): ChildProcess {
		return this.launchDevAt(appRoot, "dev", "Test app (dev)");
	}

	/** Looks up `dev_apps` by id and starts its dev script in `source_path`. */
	async launchDevAppById(devAppId: number): Promise<boolean> {
		const r = await this.devAppRepo.findOne({ where: { id: devAppId } });
		if (!r) {
			this.logger.warn(`launchDevApp: no dev_apps row for id=${devAppId}`);
			return false;
		}
		this.launchDevAt(r.sourcePath, r.devScript, `${r.name} (dev)`);
		return true;
	}

	getSnapshot(): LaunchedApp[] {
		const rows: LaunchedApp[] = [];
		for (const [id, t] of this.processes) {
			rows.push({
				id,
				label: t.label,
				mode: t.mode,
				appRoot: t.appRoot,
				...(typeof t.proc.pid === "number" ? { pid: t.proc.pid } : {}),
			});
		}
		rows.sort((a, b) => a.label.localeCompare(b.label));
		return rows;
	}

	private registerProcess(
		proc: ChildProcess,
		meta: { label: string; mode: LaunchedAppMode; appRoot: string },
	): void {
		const id = randomUUID();
		this.processes.set(id, { proc, ...meta });

		proc.stdout?.on("data", (chunk: Buffer) => {
			this.logger.debug(`[${meta.label} stdout] ${chunk.toString().trimEnd()}`);
		});
		proc.stderr?.on("data", (chunk: Buffer) => {
			this.logger.warn(`[${meta.label} stderr] ${chunk.toString().trimEnd()}`);
		});

		let cleaned = false;
		const cleanup = () => {
			if (cleaned) {
				return;
			}
			cleaned = true;
			this.processes.delete(id);
		};

		proc.on("error", (err) => {
			this.logger.error(`Child process error (${meta.label}): ${err.message}`);
			cleanup();
		});
		proc.on("exit", (code, signal) => {
			this.logger.log(
				`${meta.label} exited code=${code} signal=${signal ?? ""}`,
			);
			cleanup();
		});
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
		return {
			...env,
			BRODORA_HTTP_PORT: String(process.env.BRODORA_HTTP_PORT ?? "19842"),
		};
	}

	/** `core/test-app` next to `core/brodora` (from `out/main/index.js`, three levels up to `core`). */
	defaultTestAppRoot(): string {
		return join(__dirname, "..", "..", "..", "test-app");
	}

	onModuleDestroy(): void {
		for (const { proc } of this.processes.values()) {
			if (!proc.killed) {
				proc.kill("SIGTERM");
			}
		}
		this.processes.clear();
	}
}
