import { ThemeProvider } from "@brodora/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<HashRouter>
				<App />
			</HashRouter>
		</ThemeProvider>
	</React.StrictMode>,
);
