import { Box, Pagination, Stack } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		pageCount: { control: "number" },
		siblingCount: { control: "number" },
	},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function PaginationStory(args) {
		const [page, setPage] = React.useState(1);
		return <Pagination {...args} page={page} onPageChange={setPage} />;
	},
	args: {
		page: 1,
		onPageChange: () => {},
		pageCount: 10,
		siblingCount: 1,
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
};
