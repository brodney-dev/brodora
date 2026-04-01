import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="library" element={<LibraryPage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
}
