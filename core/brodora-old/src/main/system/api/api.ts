import { ipcMain } from "electron";
import * as O from "fp-ts/Option";
import type { z } from "zod";
import type { BrodoraApiHandler } from "../../../shared/api/_common/api";

export const handleBrodoraApi = <
	K extends string = string,
	InputValidator extends z.ZodType = z.ZodType,
	OutputValidator extends z.ZodType = z.ZodType,
>(
	api: BrodoraApiHandler<K, InputValidator, OutputValidator>,
	handler: (
		input: z.infer<InputValidator>,
	) => Promise<z.infer<OutputValidator>> | z.infer<OutputValidator>,
): void => {
	ipcMain.handle(api.getKey(), (_, args) => {
		const input = api.validateInput(args);
		if (O.isNone(input)) {
			return;
		}
		return handler(input.value);
	});
};
