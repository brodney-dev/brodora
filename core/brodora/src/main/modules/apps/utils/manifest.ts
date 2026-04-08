import { dirname, resolve } from "node:path";
import { z } from "zod";

const optionalDevScript = z.string().min(1).optional();

/**
 * Per-OS installer locations for built apps.
 *
 * When the manifest lives on disk (local library app), values are paths relative to the
 * manifest file’s directory — resolve with {@link resolveManifestPlatformUrl}.
 *
 * When the manifest is loaded from a remote catalog, values are `http:` / `https:` URLs
 * pointing at downloadable installers for that platform.
 */
const platformsSchema = z.object({
	mac: z.string().min(1).optional(),
	win: z.string().min(1).optional(),
	linux: z.string().min(1).optional(),
});

const baseFields = {
	appId: z.string().min(1),
	name: z.string().min(1),
} as const;

/** Local dev manifest: requires `devScript`. Optional `platforms` (same shape as production). */
export const devManifestSchema = z.object({
	...baseFields,
	platforms: platformsSchema.optional(),
	devScript: z.string().min(1),
});

/**
 * Built / production manifest (library catalog entry): requires `main` and `platforms`
 * with at least one OS. Optional `devScript`.
 */
export const appManifestSchema = z
	.object({
		...baseFields,
		main: z.string().min(1),
		devScript: optionalDevScript,
		platforms: platformsSchema,
	})
	.superRefine((val, ctx) => {
		const { mac, win, linux } = val.platforms;
		if (mac == null && win == null && linux == null) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"Specify at least one of platforms.mac, platforms.win, or platforms.linux.",
				path: ["platforms"],
			});
		}
	});

export type DevManifest = z.infer<typeof devManifestSchema>;
export type AppManifest = z.infer<typeof appManifestSchema>;

const ABS_HTTP_URL = /^https?:\/\//i;

/**
 * Resolves a platform installer ref from an on-disk manifest path. `http:` / `https:`
 * refs are returned unchanged; relative paths are resolved against the manifest file’s directory.
 */
export function resolveManifestPlatformUrl(
	manifestFilePath: string,
	ref: string,
): string {
	if (ABS_HTTP_URL.test(ref)) {
		return ref;
	}
	return resolve(dirname(manifestFilePath), ref);
}

/**
 * Resolves a `platforms.*` ref against the directory that contains the manifest file.
 * Prefer {@link resolveManifestPlatformUrl} when you have the manifest file path.
 */
export function resolvePlatformRefFromManifestDir(
	manifestDir: string,
	ref: string,
): string {
	if (ABS_HTTP_URL.test(ref)) {
		return ref;
	}
	return resolve(manifestDir, ref);
}

/**
 * Best-effort manifest directory when `manifest_path` was not stored (older rows).
 * Assumes `sourceRef` was computed as `resolve(manifestDir, dirname(main))`.
 */
export function inferManifestDirFromSourceRefAndMain(
	sourceRef: string,
	main: string,
): string {
	const mainDir = dirname(main);
	const depth = mainDir.split(/[/\\]/).filter(Boolean).length;
	let cur = sourceRef;
	for (let i = 0; i < depth; i++) {
		cur = dirname(cur);
	}
	return cur;
}

export function stripManifestLineComments(source: string): string {
	return source
		.split(/\r?\n/)
		.filter((line) => {
			const t = line.trim();
			return t.length > 0 && !t.startsWith("//");
		})
		.join("\n");
}

function parseManifestJson(source: string): unknown {
	const jsonText = stripManifestLineComments(source);
	try {
		return JSON.parse(jsonText);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(`Invalid app.brodora JSON: ${message}`);
	}
}

export function parseDevManifest(source: string): DevManifest {
	return devManifestSchema.parse(parseManifestJson(source));
}

export function parseAppManifest(source: string): AppManifest {
	return appManifestSchema.parse(parseManifestJson(source));
}
