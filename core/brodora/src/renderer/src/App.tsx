import { Box, Spinner } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { HomePage } from "./pages/HomePage";
import { IntroWorkspacePage } from "./pages/IntroWorkspacePage";
import { LibraryPage } from "./pages/LibraryPage";

type AppGate = "loading" | "intro" | "ready";

export default function App() {
	const [gate, setGate] = React.useState<AppGate>("loading");

	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			const listed = await window.api.users.list();
			if (cancelled) {
				return;
			}
			if (O.isNone(listed)) {
				setGate("intro");
				return;
			}
			if (listed.value.length === 0) {
				setGate("intro");
				return;
			}
			const first = listed.value[0];
			if (first) {
				void window.api.users.recordAccess({ id: first.id });
			}
			setGate("ready");
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
		return <IntroWorkspacePage onComplete={() => setGate("ready")} />;
	}

	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="library" element={<LibraryPage />} />
			</Route>
		</Routes>
	);
}
