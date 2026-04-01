import { Button, Stack, Tooltip, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	argTypes: {
		placement: {
			control: "select",
			options: ["top", "bottom"],
		},
		delayEnterMs: { control: "number" },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithButton: Story = {
	args: {
		title: "Save your changes",
		delayEnterMs: 400,
		placement: "top",
		children: <Button type="button">Save</Button>,
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button type="button">Save</Button>
		</Tooltip>
	),
};

export const FocusAndHover: Story = {
	args: {
		title: "Keyboard and pointer accessible",
		delayEnterMs: 200,
		children: <Button type="button">Focus or hover</Button>,
	},
	render: () => (
		<Stack spacing={3}>
			<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
				Hover the control or move focus to it with Tab; the tooltip appears
				after a short delay and pairs via <code>aria-describedby</code>.
			</Typography>
			<Tooltip title="Keyboard and pointer accessible" delayEnterMs={200}>
				<Button type="button">Focus or hover</Button>
			</Tooltip>
		</Stack>
	),
};

export const LongText: Story = {
	args: {
		title:
			"This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports.",
		delayEnterMs: 0,
		delayLeaveMs: 100,
		children: <Button type="button">Hover for long text</Button>,
	},
	render: () => (
		<Tooltip
			title="This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports."
			delayEnterMs={0}
			delayLeaveMs={100}
		>
			<Button type="button">Hover for long text</Button>
		</Tooltip>
	),
};

export const PlacementBottom: Story = {
	args: {
		title: "Tooltip below the anchor",
		placement: "bottom",
		delayEnterMs: 0,
		children: <Button type="button">Bottom placement</Button>,
	},
	render: (args) => (
		<Tooltip {...args}>
			<Button type="button">Bottom placement</Button>
		</Tooltip>
	),
};
