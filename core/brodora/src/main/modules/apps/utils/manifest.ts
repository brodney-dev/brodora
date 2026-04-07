import { z } from "zod";

const optionalUrl = z.url().optional();
const optionalDevScript = z.string().min(1).optional();

const baseFields = {
	appId: z.string().min(1),
	name: z.string().min(1),
	version: z.string().min(1),
	apiVersion: z.string().min(1),
	main: z.string().min(1),
} as const;

/** Local dev manifest: requires `devScript`. */
export const devManifestSchema = z.object({
	...baseFields,
	install: optionalUrl,
	devScript: z.string().min(1),
});

/** Installed / catalog manifest: optional `install` URL and `devScript`. */
export const appManifestSchema = z.object({
	...baseFields,
	install: optionalUrl,
	devScript: optionalDevScript,
});

export type DevManifest = z.infer<typeof devManifestSchema>;
export type AppManifest = z.infer<typeof appManifestSchema>;

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
