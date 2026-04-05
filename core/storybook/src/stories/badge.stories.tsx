import { Badge, SEMANTIC_COLOR_NAMES } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
		appearance: {
			control: "select",
			options: ["soft", "outline"],
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
		color: "neutral",
		appearance: "soft",
		size: "sm",
	},
};

export const Primary: Story = {
	args: {
		children: "New",
		color: "primary",
		appearance: "soft",
		size: "md",
	},
};
