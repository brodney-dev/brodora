import { Box, Divider, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Divider",
	component: Divider,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
	},
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		orientation: "horizontal",
	},
	render: (args) => (
		<Box sx={{ maxWidth: 360 }}>
			<Typography variant="body-sm" as="p">
				Section one
			</Typography>
			<Divider {...args} />
			<Typography variant="body-sm" as="p">
				Section two
			</Typography>
		</Box>
	),
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
	render: (args) => (
		<Stack
			direction="row"
			spacing={2}
			alignItems="center"
			style={{ minHeight: 48 }}
		>
			<Typography variant="body-sm" as="span">
				Left
			</Typography>
			<Divider {...args} />
			<Typography variant="body-sm" as="span">
				Right
			</Typography>
		</Stack>
	),
};
