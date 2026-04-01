import { Box, Skeleton, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
	argTypes: {
		circle: { control: "boolean" },
	},
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		width: 240,
		height: 16,
	},
};

export const TextBlock: Story = {
	render: () => (
		<Stack spacing={2} sx={{ maxWidth: 360 }}>
			<Skeleton height={16} width="85%" />
			<Skeleton height={16} width="92%" />
			<Skeleton height={16} width="70%" />
		</Stack>
	),
};

export const AvatarRow: Story = {
	render: () => (
		<Stack direction="row" spacing={2} alignItems="center">
			<Skeleton circle height={40} width={40} />
			<Box sx={{ width: 220 }}>
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					<Skeleton height={14} width="60%" />
				</Typography>
				<Box sx={{ marginTop: 6 }}>
					<Skeleton height={12} width="80%" />
				</Box>
			</Box>
		</Stack>
	),
};
