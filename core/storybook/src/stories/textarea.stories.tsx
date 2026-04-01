import { Textarea } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Textarea",
	component: Textarea,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		fullWidth: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Description",
		placeholder: "Enter details…",
		helperText: "Shown below the field.",
		rows: 4,
		error: false,
		fullWidth: false,
		disabled: false,
	},
};

export const WithError: Story = {
	args: {
		...Default.args,
		error: true,
		helperText: "This field is required.",
		defaultValue: "",
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
		defaultValue: "Read-only content.",
	},
};

export const FullWidth: Story = {
	args: {
		...Default.args,
		fullWidth: true,
	},
	render: (args) => (
		<div style={{ width: 400 }}>
			<Textarea {...args} />
		</div>
	),
};
