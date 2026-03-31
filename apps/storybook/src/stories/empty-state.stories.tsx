import { Button, EmptyState } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: "Nothing here yet",
		description: "Add your first item to get started.",
	},
};

export const WithAction: Story = {
	args: {
		heading: "No results",
		description: "Try adjusting your filters.",
	},
	render: (args) => (
		<EmptyState {...args}>
			<Button type="button">Reset filters</Button>
		</EmptyState>
	),
};
