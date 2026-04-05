import { Button, SEMANTIC_COLOR_NAMES } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Brodora Button",
		color: "primary",
		disabled: false,
		startNode: null,
		endNode: null,
	},
};
