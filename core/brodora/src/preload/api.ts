import { ipcRenderer } from "electron";
import * as O from "fp-ts/Option";
import type { z } from "zod";
import { BrodoraApi } from "../shared/api";
import type { BrodoraApiHandler } from "../shared/api/_common/api";

export const setupBrodoraApiHanlder = <
	K extends string = string,
	InputValidator extends z.ZodType = z.ZodType,
	OutputValidator extends z.ZodType = z.ZodType,
>(
	api: BrodoraApiHandler<K, InputValidator, OutputValidator>,
): ((
	input: z.infer<InputValidator>,
) => Promise<O.Option<z.infer<OutputValidator>>>) => {
	return async (input: z.infer<InputValidator>) => {
		try {
			const result = await ipcRenderer.invoke(api.getKey(), input);
			return api.validateOutput(result);
		} catch (error) {
			console.error("Error calling API", error);
			return O.none;
		}
	};
};

export const setupBrodoraApi = <
	T extends Record<string, BrodoraApiHandler<string, z.ZodType, z.ZodType>>,
>(
	api: T,
): {
	[K in keyof T]: (
		input: z.infer<T[K]["inputValidator"]>,
	) => Promise<O.Option<z.infer<T[K]["outputValidator"]>>>;
} => {
	return Object.fromEntries(
		Object.entries(api).map(([key, value]) => [
			key,
			setupBrodoraApiHanlder(value),
		]),
	) as {
		[K in keyof T]: (
			input: z.infer<T[K]["inputValidator"]>,
		) => Promise<O.Option<z.infer<T[K]["outputValidator"]>>>;
	};
};

export const CallableBrodoraApi = {
	users: setupBrodoraApi(BrodoraApi.users),
};
