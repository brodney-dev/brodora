import { Badge } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "primary", "success", "warning", "error", "outline"],
		},
		size: {
			control: "select",
			options: ["sm", "md"],
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Beta",
		variant: "default",
		size: "sm",
	},
};

export const Primary: Story = {
	args: {
		children: "New",
		variant: "primary",
		size: "md",
	},
};
