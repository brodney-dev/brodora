import "./assets/main.css";

import { ThemeProvider } from "@brodora/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { RequiresUser } from "./user";

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Missing #root element");
}

createRoot(rootEl).render(
	<StrictMode>
		<ThemeProvider>
			<HashRouter>
				<RequiresUser>
					<App />
				</RequiresUser>
			</HashRouter>
		</ThemeProvider>
	</StrictMode>,
);
