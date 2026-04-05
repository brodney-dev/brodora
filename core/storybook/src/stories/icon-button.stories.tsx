import { Settings, Trash2 } from "@brodora/icons";
import { IconButton, SEMANTIC_COLOR_NAMES } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/IconButton",
	component: IconButton,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "secondary",
		size: "md",
		disabled: false,
	},
	render: (args: any) => (
		<IconButton {...args}>
			<Settings size={20} strokeWidth={2} />
		</IconButton>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
			<IconButton size="sm" type="button">
				<Trash2 size={16} strokeWidth={2} />
			</IconButton>
			<IconButton size="md" type="button">
				<Trash2 size={20} strokeWidth={2} />
			</IconButton>
			<IconButton size="lg" type="button">
				<Trash2 size={22} strokeWidth={2} />
			</IconButton>
		</div>
	),
};
