import {
	Box,
	Button,
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Typography,
} from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Popover",
	component: Popover,
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultOpen: false,
		onOpenChange: () => {},
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
	render: () => (
		<Popover defaultOpen={false}>
			<PopoverAnchor>
				<PopoverTrigger>
					<Button type="button">Open popover</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Stack spacing={2}>
						<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
							This is a non-modal anchored panel. Click outside or press Escape
							to close.
						</Typography>
						<Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
							<Button type="button">Action</Button>
							<Button
								type="button"
								sx={{
									background: "#f1f5f9",
									color: "#334155",
									border: "1px solid #cbd5e1",
								}}
							>
								Secondary
							</Button>
						</Box>
					</Stack>
				</PopoverContent>
			</PopoverAnchor>
		</Popover>
	),
};

export const PlacementTopEnd: Story = {
	args: {
		defaultOpen: true,
		onOpenChange: () => {},
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
	render: () => (
		<Box sx={{ paddingTop: 80 }}>
			<Popover defaultOpen>
				<PopoverAnchor>
					<PopoverTrigger>
						<Button type="button">Anchor</Button>
					</PopoverTrigger>
					<PopoverContent placement="top-end">
						<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
							Top-end placement.
						</Typography>
					</PopoverContent>
				</PopoverAnchor>
			</Popover>
		</Box>
	),
};
