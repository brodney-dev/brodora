import * as O from "fp-ts/Option";
import * as React from "react";
import type { SessionUserState } from "../../../shared/api/session-user";
import type { SessionUser } from "./types";

export function useOptionalUser(): SessionUserState {
	const [user, setUser] = React.useState<SessionUserState>(
		() => window.__initialState?.user ?? null,
	);

	React.useEffect(() => {
		window.api.users.getLoggedIn().then((user) => {
			if (O.isSome(user)) {
				setUser(user.value);
			}
		});

		return window.api.ipc.onUserChanged(setUser);
	}, []);

	return user;
}

export function useUser(): SessionUser {
	const user = useOptionalUser();
	if (user === null) {
		throw new Error(
			"No user is logged in. useUser() is only valid while a session is active.",
		);
	}
	return user;
}
