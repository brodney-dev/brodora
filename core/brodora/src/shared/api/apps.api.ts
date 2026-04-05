import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

export const libraryAppRowSchema = z.object({
	id: z.number(),
	userId: z.number(),
	appId: z.string(),
	name: z.string(),
	type: z.string(),
	sourceRef: z.string(),
	addedAt: z.string(),
});

export type LibraryAppRow = z.infer<typeof libraryAppRowSchema>;

export const AppsApi = {
	/** Rows in `library_apps` for the currently logged-in user (empty if none). */
	listLibraryApps: new BrodoraApiHandler({
		key: "apps:listLibraryApps",
		inputValidator: z.void(),
		outputValidator: z.array(libraryAppRowSchema),
	}),
};
