import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

export const LauncherApi = {
	/** Spawns the bundled test Electron app (`core/test-app`) as a child process. */
	launchTestApp: new BrodoraApiHandler({
		key: "launcher:launchTestApp",
		inputValidator: z.void(),
		outputValidator: z.boolean(),
	}),
};
