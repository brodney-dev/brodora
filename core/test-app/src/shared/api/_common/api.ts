import * as O from "fp-ts/Option";
import type { z } from "zod";

export class BrodoraApiHandler<
	K extends string = string,
	InputValidator extends z.ZodType = z.ZodType,
	OutputValidator extends z.ZodType = z.ZodType,
> {
	readonly key: K;
	readonly inputValidator: InputValidator;
	readonly outputValidator: OutputValidator;

	constructor({
		key,
		inputValidator,
		outputValidator,
	}: {
		key: K;
		inputValidator: InputValidator;
		outputValidator: OutputValidator;
	}) {
		this.key = key;
		this.inputValidator = inputValidator;
		this.outputValidator = outputValidator;
	}

	public getKey(): K {
		return this.key;
	}

	public getValidator(): InputValidator {
		return this.inputValidator;
	}

	public validateInput(data: unknown): O.Option<z.infer<InputValidator>> {
		const result = this.inputValidator.safeParse(data);
		return result.success ? O.some(result.data) : O.none;
	}

	public validateOutput(data: unknown): O.Option<z.infer<OutputValidator>> {
		const result = this.outputValidator.safeParse(data);
		return result.success ? O.some(result.data) : O.none;
	}
}
