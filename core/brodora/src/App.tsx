import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { LibraryContainer } from "./library/containers/LibraryContainer";
import { MarketplaceContainer } from "./marketplace/containers/MarketplaceContainer";
import { ProfileContainer } from "./profile/containers/ProfileContainer";
import { ThemeSettingsContainer } from "./settings/containers/ThemeSettingsContainer";

function App() {
	return (
		<AppLayout>
			<Routes>
				<Route index path="/" element={<LibraryContainer />} />
				<Route path="/marketpalce" element={<MarketplaceContainer />} />
				<Route path="/profile" element={<ProfileContainer />} />
				<Route path="/theme" element={<ThemeSettingsContainer />} />
			</Routes>
		</AppLayout>
	);
}

export default App;
