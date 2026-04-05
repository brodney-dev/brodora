import { NavItem, Stack } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/NavItem",
	component: NavItem,
	tags: ["autodocs"],
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Home",
		active: false,
		fullWidth: true,
	},
};

export const Active: Story = {
	args: {
		children: "Library",
		active: true,
		fullWidth: true,
	},
};

export const SidebarGroup: Story = {
	render: () => (
		<Stack spacing={1} style={{ width: "15rem", padding: "1rem" }}>
			<NavItem active>Home</NavItem>
			<NavItem>Library</NavItem>
			<NavItem>Settings</NavItem>
		</Stack>
	),
};

export const WithNodes: Story = {
	render: () => (
		<Stack spacing={1} style={{ width: "15rem" }}>
			<NavItem active startNode={<span aria-hidden>📁</span>}>
				Projects
			</NavItem>
			<NavItem startNode={<span aria-hidden>⚙</span>} endNode={<span>⌘,</span>}>
				Preferences
			</NavItem>
		</Stack>
	),
};
