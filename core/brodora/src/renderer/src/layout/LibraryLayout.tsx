import { Outlet } from "react-router-dom";

/** Nested routes under `/library`; chrome lives in `AppLayout` + `AppSidebar`. */
export function LibraryLayout() {
	return <Outlet />;
}
