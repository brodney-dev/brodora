import * as O from "fp-ts/Option";
import * as React from "react";
import type { DevAppRow } from "../../../shared/api/apps.api";

function loadDevApps(
	setRows: React.Dispatch<React.SetStateAction<DevAppRow[]>>,
): void {
	void window.api.apps.listDevApps(undefined).then((res) => {
		if (O.isSome(res)) {
			setRows(res.value);
		}
	});
}

const DevAppsContext = React.createContext<{
	rows: DevAppRow[];
	refetch: () => void;
} | null>(null);

/** Wraps the shell so the sidebar and library views share one dev-apps list. */
export function DevAppsProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const [rows, setRows] = React.useState<DevAppRow[]>([]);
	const refetch = React.useCallback(() => {
		loadDevApps(setRows);
	}, []);

	React.useEffect(() => {
		loadDevApps(setRows);
		return window.api.ipc.onUserChanged(() => {
			loadDevApps(setRows);
		});
	}, []);

	return (
		<DevAppsContext.Provider value={{ rows, refetch }}>
			{children}
		</DevAppsContext.Provider>
	);
}

/** Rows from `dev_apps` (local projects registered via `app.brodora`). */
export function useDevApps(): {
	rows: DevAppRow[];
	refetch: () => void;
} {
	const ctx = React.useContext(DevAppsContext);
	if (ctx == null) {
		throw new Error("useDevApps must be used within DevAppsProvider");
	}
	return ctx;
}
