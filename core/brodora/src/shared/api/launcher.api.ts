import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";
import { launchedAppsListSchema } from "./launched-apps";

export const LauncherApi = {
	/** Current child app processes started by Brodora (production or dev). */
	getLaunchedApps: new BrodoraApiHandler({
		key: "launcher:getLaunchedApps",
		inputValidator: z.void(),
		outputValidator: launchedAppsListSchema,
	}),
	/** Spawns the bundled test Electron app (`core/test-app`) as a child process. */
	launchTestApp: new BrodoraApiHandler({
		key: "launcher:launchTestApp",
		inputValidator: z.void(),
		outputValidator: z.boolean(),
	}),
	/** Runs `pnpm run dev` in `core/test-app` (electron-vite dev server + Electron). */
	launchTestAppDev: new BrodoraApiHandler({
		key: "launcher:launchTestAppDev",
		inputValidator: z.void(),
		outputValidator: z.boolean(),
	}),
};
