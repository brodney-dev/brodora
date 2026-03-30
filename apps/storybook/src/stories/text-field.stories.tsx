import { TextField } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/TextField",
	component: TextField,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		fullWidth: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Label",
		placeholder: "Type here",
		helperText: "Helper text",
		error: false,
		fullWidth: false,
		disabled: false,
	},
};

export const WithError: Story = {
	args: {
		...Default.args,
		error: true,
		helperText: "This field has an error",
		defaultValue: "invalid@",
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
		defaultValue: "Read only",
	},
};

export const FullWidth: Story = {
	args: {
		...Default.args,
		fullWidth: true,
	},
	render: (args) => (
		<div style={{ width: 360 }}>
			<TextField {...args} />
		</div>
	),
};
