import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

export const MigrationApi = {
	isMigrated: new BrodoraApiHandler({
		key: "migration:isMigrated",
		inputValidator: z.void(),
		outputValidator: z.boolean(),
	}),
	isMigrationApplied: new BrodoraApiHandler({
		key: "migration:isMigrationApplied",
		inputValidator: z.object({
			name: z.string(),
		}),
		outputValidator: z.boolean(),
	}),
};
