import { Button, ButtonGroup } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/ButtonGroup",
	component: ButtonGroup,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "inline-radio",
			options: ["horizontal", "vertical"],
		},
	},
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		orientation: "horizontal",
	},
	render: (args: any) => (
		<ButtonGroup {...args}>
			<Button type="button">One</Button>
			<Button type="button">Two</Button>
			<Button type="button">Three</Button>
		</ButtonGroup>
	),
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
	render: (args: any) => (
		<ButtonGroup {...args}>
			<Button type="button">One</Button>
			<Button type="button">Two</Button>
			<Button type="button">Three</Button>
		</ButtonGroup>
	),
};
