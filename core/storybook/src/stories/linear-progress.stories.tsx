import { LinearProgress, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/LinearProgress",
	component: LinearProgress,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "select", options: ["primary", "success", "error"] },
		height: { control: "number" },
	},
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = {
	args: {
		variant: "primary",
		height: 6,
	},
};

export const Determinate: Story = {
	args: {
		value: 35,
		variant: "primary",
		height: 6,
	},
};

export const Animated: Story = {
	render: function AnimatedStory() {
		const [value, setValue] = React.useState(10);
		React.useEffect(() => {
			const id = setInterval(() => {
				setValue((v) => (v >= 100 ? 0 : v + 10));
			}, 700);
			return () => clearInterval(id);
		}, []);
		return (
			<Stack spacing={2} sx={{ maxWidth: 360 }}>
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Value: {value}%
				</Typography>
				<LinearProgress value={value} />
			</Stack>
		);
	},
};
