import { List, ListDivider, ListItem, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/List",
	component: List,
	tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<List sx={{ maxWidth: 360 }}>
			<ListItem>
				<Typography variant="body-sm" as="span">
					First item
				</Typography>
			</ListItem>
			<ListItem>
				<Typography variant="body-sm" as="span">
					Second item
				</Typography>
			</ListItem>
			<ListDivider />
			<ListItem>
				<Typography variant="body-sm" as="span">
					After divider
				</Typography>
			</ListItem>
		</List>
	),
};
