/** Matches Brodora `GET /users/:id` JSON (`UserRow`). */
export type BrodoraParentUserRow = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	lastAccessed: string | null;
	loggedIn: boolean;
};
