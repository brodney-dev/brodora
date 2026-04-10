import type { ReactNode } from "react";
import { LockScreen } from "../lockscreen";
import { useOptionalUser } from "./useUser";

export type RequiresUserProps = {
	children: ReactNode;
};

/**
 * Renders the lock screen when the server reports no logged-in user; otherwise
 * the app. Session is driven by preload `__initialState` and `api.ipc` events.
 */
export function RequiresUser({ children }: RequiresUserProps) {
	const sessionUser = useOptionalUser();

	if (sessionUser === null) {
		return <LockScreen />;
	}

	return children;
}
