import * as O from "fp-ts/Option";
import * as React from "react";
import type { LibraryAppRow } from "../../../shared/api/apps.api";

function loadLibraryApps(
	setRows: React.Dispatch<React.SetStateAction<LibraryAppRow[]>>,
): void {
	void window.api.apps.listLibraryApps(undefined).then((res) => {
		if (O.isSome(res)) {
			setRows(res.value);
		}
	});
}

const LibraryAppsContext = React.createContext<{
	rows: LibraryAppRow[];
	refetch: () => void;
} | null>(null);

/** Wraps the shell so the sidebar and library views share one catalog list. */
export function LibraryAppsProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const [rows, setRows] = React.useState<LibraryAppRow[]>([]);
	const refetch = React.useCallback(() => {
		loadLibraryApps(setRows);
	}, []);

	React.useEffect(() => {
		loadLibraryApps(setRows);
		return window.api.ipc.onUserChanged(() => {
			loadLibraryApps(setRows);
		});
	}, []);

	return (
		<LibraryAppsContext.Provider value={{ rows, refetch }}>
			{children}
		</LibraryAppsContext.Provider>
	);
}

/** Rows from `library_apps` for the logged-in user. */
export function useLibraryApps(): {
	rows: LibraryAppRow[];
	refetch: () => void;
} {
	const ctx = React.useContext(LibraryAppsContext);
	if (ctx == null) {
		throw new Error("useLibraryApps must be used within LibraryAppsProvider");
	}
	return ctx;
}
