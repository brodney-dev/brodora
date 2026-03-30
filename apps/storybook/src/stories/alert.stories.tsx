import { Alert } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["info", "success", "warning", "error"],
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
	args: {
		variant: "info",
		title: "Heads up",
		children: "Something changed that you should know about.",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		title: "Saved",
		children: "Your preferences were updated successfully.",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Action required",
		children: "Your trial ends in three days.",
	},
};

export const ErrorAlert: Story = {
	args: {
		variant: "error",
		title: "Something went wrong",
		children: "We could not complete that request. Try again in a moment.",
	},
};

export const BodyOnly: Story = {
	args: {
		variant: "info",
		children: "Compact alert without a title row.",
	},
};
