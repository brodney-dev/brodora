import {
	Box,
	Button,
	Menu,
	MenuAnchor,
	MenuContent,
	MenuItem,
	MenuSeparator,
	MenuTrigger,
	Stack,
} from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Menu",
	component: Menu,
	tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: false,
		onOpenChange: () => {},
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
	render: () => (
		<Menu>
			<MenuAnchor>
				<MenuTrigger>
					<Button type="button">Open menu</Button>
				</MenuTrigger>
				<MenuContent>
					<MenuItem>Profile</MenuItem>
					<MenuItem>Settings</MenuItem>
					<MenuSeparator />
					<MenuItem>Sign out</MenuItem>
				</MenuContent>
			</MenuAnchor>
		</Menu>
	),
};
