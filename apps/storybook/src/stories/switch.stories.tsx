import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Switch, Typography } from "@brodora/ui";

const meta = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
		defaultChecked: false,
	},
};

export const On: Story = {
	args: {
		defaultChecked: true,
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultChecked: false,
	},
};

export const WithLabel: Story = {
	render: () => (
		<Stack direction="row" spacing={2} alignItems="center">
			<Typography variant="body-sm" as="span">
				Notifications
			</Typography>
			<Switch defaultChecked aria-label="Enable notifications" />
		</Stack>
	),
};
