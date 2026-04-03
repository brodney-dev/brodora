import { Box, Spinner } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { HomePage } from "./pages/HomePage";
import {
	IntroUsernamePage,
	USERNAME_SETTING_KEY,
} from "./pages/IntroUsernamePage";
import { LibraryPage } from "./pages/LibraryPage";
import { SettingsPage } from "./pages/SettingsPage";

type AppGate = "loading" | "intro" | "ready";

function hasUsernameSetting(rows: { key: string; value: string }[]): boolean {
	const row = rows.find((r) => r.key === USERNAME_SETTING_KEY);
	return Boolean(row?.value?.trim());
}

export default function App() {
	const [gate, setGate] = React.useState<AppGate>("loading");

	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			const rows = await window.api.settings.getAll();
			if (O.isNone(rows)) {
				setGate("intro");
				return;
			}

			if (cancelled) {
				return;
			}
			const hasUsername = hasUsernameSetting(rows.value);
			setGate(hasUsername ? "ready" : "intro");
		})().catch(() => {
			if (!cancelled) {
				setGate("intro");
			}
		});
		return () => {
			cancelled = true;
		};
	}, []);

	if (gate === "loading") {
		return (
			<Box
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spinner size={36} aria-label="Loading" />
			</Box>
		);
	}

	if (gate === "intro") {
		return <IntroUsernamePage onComplete={() => setGate("ready")} />;
	}

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
