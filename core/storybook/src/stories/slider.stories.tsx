import { Slider, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Slider",
	component: Slider,
	tags: ["autodocs"],
	argTypes: {
		min: { control: "number" },
		max: { control: "number" },
		step: { control: "number" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function SliderStory(args) {
		const [v, setV] = React.useState(40);
		return (
			<Stack spacing={2} sx={{ maxWidth: 360 }}>
				<Slider
					{...args}
					value={v}
					onChange={(e) => setV(Number((e.target as HTMLInputElement).value))}
				/>
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Value: {v}
				</Typography>
			</Stack>
		);
	},
	args: {
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
	},
};
