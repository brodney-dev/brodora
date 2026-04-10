import { z } from "zod";

/** Logged-in user shape (matches DB session row). */
export const sessionUserSchema = z.object({
	id: z.number(),
	name: z.string(),
});

/** `null` when no user is logged in on the server. */
export const sessionUserStateSchema = sessionUserSchema.nullable();

export type SessionUser = z.infer<typeof sessionUserSchema>;
export type SessionUserState = z.infer<typeof sessionUserStateSchema>;

/** Main → renderer: session changed after login / logout / etc. */
export const BRODORA_IPC_USER_CHANGED = "brodora:userChanged" as const;
