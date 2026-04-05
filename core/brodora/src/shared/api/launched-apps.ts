import { z } from "zod";

export const launchedAppModeSchema = z.enum(["production", "development"]);

export const launchedAppSchema = z.object({
	id: z.string().uuid(),
	label: z.string(),
	mode: launchedAppModeSchema,
	appRoot: z.string(),
	pid: z.number().int().optional(),
});

export const launchedAppsListSchema = z.array(launchedAppSchema);

export type LaunchedAppMode = z.infer<typeof launchedAppModeSchema>;
export type LaunchedApp = z.infer<typeof launchedAppSchema>;
export type LaunchedAppsState = z.infer<typeof launchedAppsListSchema>;

/** Main → renderer: launched app list changed (spawn or exit). */
export const BRODORA_IPC_LAUNCHED_APPS_CHANGED =
	"brodora:launchedAppsChanged" as const;
