import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { LibraryLayout } from "./layout/LibraryLayout";
import { HomePage } from "./pages/HomePage";
import { LibraryCatalogItemPage } from "./pages/library/LibraryCatalogItemPage";
import { LibraryIndexPage } from "./pages/library/LibraryIndexPage";
import { LibraryTestAppPage } from "./pages/library/LibraryTestAppPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="library" element={<LibraryLayout />}>
					<Route index element={<LibraryIndexPage />} />
					<Route path="catalog/:id" element={<LibraryCatalogItemPage />} />
					<Route path="app/test-app" element={<LibraryTestAppPage />} />
				</Route>
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
}
