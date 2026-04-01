import { Avatar } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: { control: "number" },
	},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
	args: {
		alt: "Ada Lovelace",
		fallback: "Ada Lovelace",
		size: 40,
	},
};

export const Image: Story = {
	args: {
		src: "https://github.com/shadcn.png",
		alt: "Avatar",
		size: 48,
	},
};
