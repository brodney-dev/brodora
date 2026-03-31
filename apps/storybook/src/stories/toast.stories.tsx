import { Box, Button, Stack, ToastProvider, toast } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Toast",
	component: ToastProvider,
	tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
	render: () => (
		<ToastProvider>
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
				<Stack direction="row" spacing={2} flexWrap="wrap">
					<Button
						type="button"
						onClick={() => toast("Saved successfully.", { durationMs: 3500 })}
					>
						Show toast
					</Button>
					<Button
						type="button"
						onClick={() =>
							toast.success("Profile updated.", { durationMs: 3500 })
						}
					>
						Success
					</Button>
					<Button
						type="button"
						onClick={() =>
							toast.error("Something went wrong.", { durationMs: 6000 })
						}
					>
						Error
					</Button>
					<Button
						type="button"
						onClick={() => toast("Persistent toast", { durationMs: 0 })}
					>
						No auto-dismiss
					</Button>
				</Stack>
			</Stack>
		</ToastProvider>
	),
};

export const Many: Story = {
	args: {
		children: (
			<Stack spacing={2}>
				<Box sx={{ fontSize: "0.875rem" }}>
					Click buttons to trigger toasts. The viewport is fixed top-right.
				</Box>
			</Stack>
		),
	},
	render: function ManyStory() {
		const [n, setN] = React.useState(0);
		return (
			<ToastProvider>
				<Stack spacing={2}>
					<Button
						type="button"
						onClick={() => {
							setN((x) => x + 1);
							toast(`Toast #${n + 1}`);
						}}
					>
						Add toast
					</Button>
				</Stack>
			</ToastProvider>
		);
	},
};
