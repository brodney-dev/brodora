import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

export const libraryAppRowSchema = z.object({
	id: z.number(),
	userId: z.number(),
	appId: z.string(),
	name: z.string(),
	sourceType: z.string(),
	sourceRef: z.string(),
	manifest: z.string(),
	manifestHash: z.string(),
	addedAt: z.string(),
});

export type LibraryAppRow = z.infer<typeof libraryAppRowSchema>;

export const devAppRowSchema = z.object({
	id: z.number(),
	appId: z.string(),
	name: z.string(),
	sourcePath: z.string(),
	devScript: z.string(),
	addedAt: z.string(),
});

export type DevAppRow = z.infer<typeof devAppRowSchema>;

export const addDevAppFromDialogResultSchema = z.discriminatedUnion("ok", [
	z.object({ ok: z.literal(true), row: devAppRowSchema }),
	z.object({
		ok: z.literal(false),
		reason: z.enum([
			"cancelled",
			"invalid_manifest",
			"duplicate_app_id",
			"read_error",
		]),
	}),
]);

export type AddDevAppFromDialogResult = z.infer<
	typeof addDevAppFromDialogResultSchema
>;

export const addLocalLibraryAppFromDialogResultSchema = z.discriminatedUnion(
	"ok",
	[
		z.object({ ok: z.literal(true), row: libraryAppRowSchema }),
		z.object({
			ok: z.literal(false),
			reason: z.enum([
				"cancelled",
				"invalid_manifest",
				"duplicate_app_id",
				"read_error",
				"not_logged_in",
			]),
		}),
	],
);

export type AddLocalLibraryAppFromDialogResult = z.infer<
	typeof addLocalLibraryAppFromDialogResultSchema
>;

export const AppsApi = {
	/** Rows in `library_apps` for the currently logged-in user (empty if none). */
	listLibraryApps: new BrodoraApiHandler({
		key: "apps:listLibraryApps",
		inputValidator: z.void(),
		outputValidator: z.array(libraryAppRowSchema),
	}),
	/** Registered dev apps from `dev_apps` (local `app.brodora` projects). */
	listDevApps: new BrodoraApiHandler({
		key: "apps:listDevApps",
		inputValidator: z.void(),
		outputValidator: z.array(devAppRowSchema),
	}),
	/**
	 * Opens a file dialog for `*.brodora`, parses the dev manifest, and inserts a `dev_apps` row.
	 */
	addDevAppFromDialog: new BrodoraApiHandler({
		key: "apps:addDevAppFromDialog",
		inputValidator: z.void(),
		outputValidator: addDevAppFromDialogResultSchema,
	}),
	/**
	 * Picks `app.brodora`, parses app manifest, and inserts a `library_apps` row (`sourceType: local`).
	 */
	addLocalLibraryAppFromDialog: new BrodoraApiHandler({
		key: "apps:addLocalLibraryAppFromDialog",
		inputValidator: z.void(),
		outputValidator: addLocalLibraryAppFromDialogResultSchema,
	}),
};
