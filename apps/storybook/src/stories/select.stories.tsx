import { Select } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Select",
	component: Select,
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
		error: { control: "boolean" },
		fullWidth: { control: "boolean" },
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
		error: false,
		fullWidth: false,
		defaultValue: "us",
		children: (
			<>
				<option value="us">United States</option>
				<option value="ca">Canada</option>
				<option value="mx">Mexico</option>
			</>
		),
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const WithError: Story = {
	args: {
		...Default.args,
		error: true,
		"aria-label": "Country (invalid)",
	},
};

export const FullWidth: Story = {
	args: {
		...Default.args,
		fullWidth: true,
	},
	render: (args) => (
		<div style={{ width: 320, border: "1px dashed #cbd5e1", padding: 16 }}>
			<Select {...args} />
		</div>
	),
};
