import { SEMANTIC_COLOR_NAMES, Tag } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Tag",
	component: Tag,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
	},
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "design-system",
		color: "neutral",
	},
};

export const Removable: Story = {
	args: {
		children: "removable",
		color: "primary",
		onRemove: () => {},
		removeLabel: "Remove tag",
	},
};
