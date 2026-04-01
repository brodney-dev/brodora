import { Radio, RadioGroup } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["vertical", "horizontal"],
		},
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: "a",
		disabled: false,
		orientation: "vertical",
	},
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="a" label="Option A" />
			<Radio value="b" label="Option B" />
			<Radio value="c" label="Option C" />
		</RadioGroup>
	),
};

export const Horizontal: Story = {
	args: {
		...Default.args,
		orientation: "horizontal",
	},
	render: Default.render,
};

export const DisabledOption: Story = {
	render: () => (
		<RadioGroup defaultValue="a">
			<Radio value="a" label="Available" />
			<Radio value="b" label="Sold out" disabled />
			<Radio value="c" label="Another" />
		</RadioGroup>
	),
};

export const Controlled: Story = {
	render: function ControlledStory() {
		const [value, setValue] = React.useState("b");
		return (
			<RadioGroup value={value} onValueChange={setValue}>
				<Radio value="a" label="Alpha" />
				<Radio value="b" label="Beta" />
				<Radio value="c" label="Gamma" />
			</RadioGroup>
		);
	},
};
