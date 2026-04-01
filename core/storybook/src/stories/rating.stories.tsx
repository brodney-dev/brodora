import { Rating, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Rating",
	component: Rating,
	tags: ["autodocs"],
	argTypes: {
		max: { control: "number" },
		readOnly: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function RatingStory(args) {
		const [value, setValue] = React.useState(3);
		return (
			<Stack spacing={2}>
				<Rating {...args} value={value} onChange={setValue} />
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Selected: {value}
				</Typography>
			</Stack>
		);
	},
	args: {
		max: 5,
		readOnly: false,
		disabled: false,
	},
};

export const ReadOnly: Story = {
	args: {
		value: 4,
		readOnly: true,
		max: 5,
	},
};
