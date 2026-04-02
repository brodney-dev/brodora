import type { MainContext } from "./context";

export class Module {
	protected readonly ctx: MainContext;
	constructor(ctx: MainContext) {
		this.ctx = ctx;
	}
}
