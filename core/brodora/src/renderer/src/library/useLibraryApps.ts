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

/**
 * Catalog rows from `library_apps` for the logged-in user. Refetches when the session user changes.
 */
export function useLibraryApps(): LibraryAppRow[] {
	const [rows, setRows] = React.useState<LibraryAppRow[]>([]);

	React.useEffect(() => {
		loadLibraryApps(setRows);
		return window.api.ipc.onUserChanged(() => {
			loadLibraryApps(setRows);
		});
	}, []);

	return rows;
}
