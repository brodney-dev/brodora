import {
	LinearProgress,
	SEMANTIC_COLOR_NAMES,
	Stack,
	Typography,
} from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/LinearProgress",
	component: LinearProgress,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: [...SEMANTIC_COLOR_NAMES],
		},
		height: { control: "number" },
	},
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = {
	args: {
		color: "primary",
		height: 6,
	},
};

export const Determinate: Story = {
	args: {
		value: 35,
		color: "primary",
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
				<LinearProgress value={value} color="primary" />
			</Stack>
		);
	},
};
