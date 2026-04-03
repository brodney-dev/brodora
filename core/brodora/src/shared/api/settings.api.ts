import { z } from "zod";
import { BrodoraApiHandler } from "./_common/api";

const settingRowSchema = z.object({
	key: z.string(),
	value: z.string(),
});

export const SettingsApi = {
	getAll: new BrodoraApiHandler({
		key: "settings:getAll",
		inputValidator: z.void(),
		outputValidator: z.array(settingRowSchema),
	}),
	set: new BrodoraApiHandler({
		key: "settings:set",
		inputValidator: z.object({
			key: z.string().min(1),
			value: z.string(),
		}),
		outputValidator: z.literal(true),
	}),
};
