import { Link, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Link",
	component: Link,
	tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: "https://example.com",
		children: "Example link",
		target: "_blank",
		rel: "noopener noreferrer",
	},
};

export const InlineWithText: Story = {
	render: () => (
		<Typography variant="body" as="p">
			Read the{" "}
			<Link
				href="https://example.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				documentation
			</Link>{" "}
			for more.
		</Typography>
	),
};
