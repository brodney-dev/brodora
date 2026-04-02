import type { BrodoraDatabase } from "../db";

/** Shared deps passed into feature modules (Nest-style injection surface). */
export type MainContext = {
	brodoraDatabase: BrodoraDatabase;
};
