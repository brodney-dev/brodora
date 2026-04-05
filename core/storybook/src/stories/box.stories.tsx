import { Box, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Box",
	component: Box,
	tags: ["autodocs"],
	argTypes: {
		as: {
			control: "select",
			options: ["div", "section", "article", "main", "span"],
		},
	},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		as: "div",
		sx: {
			p: 2,
			bgcolor: "primary.container",
			borderRadius: 1,
		},
	},
	render: (args) => (
		<Box {...args}>
			<Typography variant="body">Box content</Typography>
		</Box>
	),
};
