import { create } from "zustand";
import type { SessionUser } from "./types";

type UserStore = {
	sessionUser: SessionUser | null;
	setSessionUser: (user: SessionUser | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	sessionUser: null,
	setSessionUser: (sessionUser) => set({ sessionUser }),
}));

/** Current session user, or `null` before the lock screen completes. */
export function useOptionalUser(): SessionUser | null {
	return useUserStore((s) => s.sessionUser);
}

/**
 * Current session user. Throws if no user is selected (lock screen not completed).
 * Use inside the routed app after `RequiresUser` has let the user through.
 */
export function useUser(): SessionUser {
	const user = useUserStore((s) => s.sessionUser);
	if (!user) {
		throw new Error(
			"No user is selected. The lock screen must be completed before using useUser().",
		);
	}
	return user;
}
