import { Autocomplete } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Orange", "Peach"];

const meta = {
	title: "Components/Autocomplete",
	component: Autocomplete,
	tags: ["autodocs"],
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function AutocompleteStory() {
		const [value, setValue] = React.useState("");
		return (
			<Autocomplete
				label="Fruit"
				placeholder="Type to filter…"
				options={fruits}
				value={value}
				onChange={setValue}
				fullWidth
				sx={{ maxWidth: 320 }}
			/>
		);
	},
};

export const WithLabels: Story = {
	render: () => (
		<Autocomplete
			label="Account"
			placeholder="Search…"
			options={[
				{ value: "ada", label: "Ada Lovelace (ada)" },
				{ value: "grace", label: "Grace Hopper (grace)" },
				{ value: "katherine", label: "Katherine Johnson (katherine)" },
			]}
			fullWidth
			sx={{ maxWidth: 360 }}
		/>
	),
};
