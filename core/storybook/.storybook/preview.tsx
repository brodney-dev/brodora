import { ThemeProvider } from "@brodora/ui";
import type { Preview } from "@storybook/react";
import * as React from "react";

const preview: Preview = {
	decorators: [
		(Story) => (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
