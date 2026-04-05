import * as O from "fp-ts/Option";
import * as React from "react";
import type { LaunchedAppsState } from "../../../shared/api/launched-apps";

/**
 * Live list of child apps started from Brodora (production or dev). Fetched on mount and
 * kept in sync via `api.ipc.onLaunchedAppsChanged` (not part of `__initialState`).
 */
export function useLaunchedApps(): LaunchedAppsState {
	const [apps, setApps] = React.useState<LaunchedAppsState>([]);

	React.useEffect(() => {
		void window.api.launcher.getLaunchedApps(undefined).then((res) => {
			if (O.isSome(res)) {
				setApps(res.value);
			}
		});

		return window.api.ipc.onLaunchedAppsChanged(setApps);
	}, []);

	return apps;
}
