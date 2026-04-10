import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";
import { sessionUserStateSchema } from "./session-user";

export const userRowSchema = z.object({
	id: z.number(),
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
	lastAccessed: z.string().nullable(),
	loggedIn: z.boolean(),
});

export type UserRow = z.infer<typeof userRowSchema>;

export const UsersApi = {
	list: new BrodoraApiHandler({
		key: "users:list",
		inputValidator: z.void(),
		outputValidator: z.array(userRowSchema),
	}),
	create: new BrodoraApiHandler({
		key: "users:create",
		inputValidator: z.object({
			name: z.string().min(1),
		}),
		outputValidator: userRowSchema,
	}),
	recordAccess: new BrodoraApiHandler({
		key: "users:recordAccess",
		inputValidator: z.object({
			id: z.number().int().positive(),
		}),
		outputValidator: z.literal(true),
	}),
	/** At most one user may be logged in; returns that session or `null`. */
	getLoggedIn: new BrodoraApiHandler({
		key: "users:getLoggedIn",
		inputValidator: z.void(),
		outputValidator: sessionUserStateSchema,
	}),
	/** Clears all `loggedIn` flags, then sets the given active user as logged in. */
	setLoggedIn: new BrodoraApiHandler({
		key: "users:setLoggedIn",
		inputValidator: z.object({
			id: z.number().int().positive(),
		}),
		outputValidator: z.boolean(),
	}),
	/** Clears every user's `loggedIn` flag. */
	logout: new BrodoraApiHandler({
		key: "users:logout",
		inputValidator: z.void(),
		outputValidator: z.literal(true),
	}),
};
