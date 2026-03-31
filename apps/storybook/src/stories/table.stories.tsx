import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Table",
	component: Table,
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table sx={{ maxWidth: 480 }}>
			<TableHead>
				<TableRow>
					<TableHeaderCell>Name</TableHeaderCell>
					<TableHeaderCell>Role</TableHeaderCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>Ada</TableCell>
					<TableCell>Engineer</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Grace</TableCell>
					<TableCell>Scientist</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};
