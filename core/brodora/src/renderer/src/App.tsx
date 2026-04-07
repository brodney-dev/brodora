import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { LibraryLayout } from "./layout/LibraryLayout";
import { HomePage } from "./pages/HomePage";
import { LibraryAppPage } from "./pages/library/LibraryAppPage";
import { LibraryDevAppPage } from "./pages/library/LibraryDevAppPage";
import { LibraryIndexPage } from "./pages/library/LibraryIndexPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="library" element={<LibraryLayout />}>
					<Route index element={<LibraryIndexPage />} />
					<Route path="app/:id" element={<LibraryAppPage />} />
					<Route path="dev/:id" element={<LibraryDevAppPage />} />
				</Route>
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
}
