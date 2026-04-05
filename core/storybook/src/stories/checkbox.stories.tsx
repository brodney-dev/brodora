import { Checkbox, SEMANTIC_COLOR_NAMES } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
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
		color: "primary",
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
