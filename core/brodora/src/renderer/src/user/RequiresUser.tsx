import type * as React from "react";
import { LockScreen } from "../lockscreen";
import { useUserStore } from "./userStore";

export type RequiresUserProps = {
	children: React.ReactNode;
};

/**
 * If no session user is set, shows the lock screen. After selection, records access
 * for that user and renders children (routed app).
 */
export function RequiresUser({ children }: RequiresUserProps) {
	const sessionUser = useUserStore((s) => s.sessionUser);

	if (sessionUser === null) {
		return <LockScreen />;
	}

	return children;
}
