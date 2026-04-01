import { Breadcrumbs } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Breadcrumbs",
	component: Breadcrumbs,
	tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems = [
	{ id: "home", label: "Home", href: "#" },
	{ id: "docs", label: "Docs", href: "#" },
	{ id: "current", label: "Current page" },
];

export const Default: Story = {
	args: {
		items: sampleItems,
	},
};
