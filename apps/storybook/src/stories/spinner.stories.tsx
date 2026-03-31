import { Button, Spinner, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {
		size: { control: "number" },
		thickness: { control: "number" },
		variant: { control: "select", options: ["primary", "muted"] },
	},
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 20,
		thickness: 2,
		variant: "primary",
	},
};

export const Sizes: Story = {
	args: {
		size: 20,
		thickness: 2,
		variant: "primary",
	},
	render: () => (
		<Stack direction="row" spacing={2} alignItems="center">
			<Spinner size={14} aria-label="Loading small" />
			<Spinner size={20} aria-label="Loading medium" />
			<Spinner size={28} aria-label="Loading large" />
			<Typography variant="body-sm" as="span" style={{ marginLeft: 8 }}>
				Inline spinners
			</Typography>
		</Stack>
	),
};

export const InButton: Story = {
	args: {
		size: 16,
		variant: "muted",
	},
	render: () => (
		<Button
			type="button"
			disabled
			startNode={<Spinner size={16} variant="muted" />}
		>
			Loading…
		</Button>
	),
};
