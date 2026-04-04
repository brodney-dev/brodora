import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

export const userRowSchema = z.object({
	id: z.number(),
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
	lastAccessed: z.string().nullable(),
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
};
