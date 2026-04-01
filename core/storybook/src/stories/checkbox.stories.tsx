import { Checkbox } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: "select",
			options: [undefined, true, false, "indeterminate"],
		},
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultChecked: false,
		disabled: false,
	},
};

export const Checked: Story = {
	args: {
		checked: true,
		disabled: false,
	},
};

export const Indeterminate: Story = {
	args: {
		checked: "indeterminate",
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		checked: false,
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		checked: true,
		disabled: true,
	},
};
