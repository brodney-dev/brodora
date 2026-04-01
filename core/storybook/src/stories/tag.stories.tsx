import { Tag } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Tag",
	component: Tag,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "primary", "success", "warning", "error"],
		},
	},
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "design-system",
		variant: "default",
	},
};

export const Removable: Story = {
	args: {
		children: "removable",
		variant: "primary",
		onRemove: () => {},
		removeLabel: "Remove tag",
	},
};
