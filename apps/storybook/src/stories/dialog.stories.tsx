import { Button, Dialog, Stack, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Dialog",
	component: Dialog,
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: false,
		onOpenChange: () => {},
		title: "Confirm action",
		footer: (
			<>
				<Button type="button">Cancel</Button>
				<Button type="button">Confirm</Button>
			</>
		),
		children: (
			<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
				This uses the native <code>dialog</code> element with{" "}
				<code>showModal()</code> for focus management. Press Escape or use the
				buttons to close.
			</Typography>
		),
	},
	render: function DialogStory() {
		const [open, setOpen] = React.useState(false);
		const triggerRef = React.useRef<HTMLButtonElement>(null);
		return (
			<>
				<Button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
					Open dialog
				</Button>
				<Dialog
					open={open}
					onOpenChange={setOpen}
					title="Confirm action"
					footer={
						<>
							<Button
								type="button"
								style={{
									background: "#f1f5f9",
									color: "#334155",
									border: "1px solid #cbd5e1",
								}}
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={() => {
									setOpen(false);
									triggerRef.current?.focus();
								}}
							>
								Confirm
							</Button>
						</>
					}
				>
					<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
						This uses the native <code>dialog</code> element with{" "}
						<code>showModal()</code> for focus management. Press Escape or use
						the buttons to close.
					</Typography>
				</Dialog>
			</>
		);
	},
};

export const WithoutFooter: Story = {
	args: {
		open: false,
		onOpenChange: () => {},
		title: "Notice",
		children: (
			<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
				Footer slot omitted; close with Escape or programmatically.
			</Typography>
		),
	},
	render: function WithoutFooterStory() {
		const [open, setOpen] = React.useState(false);
		return (
			<>
				<Button type="button" onClick={() => setOpen(true)}>
					Open simple dialog
				</Button>
				<Dialog open={open} onOpenChange={setOpen} title="Notice">
					<Stack spacing={2}>
						<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
							Footer slot omitted; close with Escape or programmatically.
						</Typography>
						<Button type="button" onClick={() => setOpen(false)}>
							Close
						</Button>
					</Stack>
				</Dialog>
			</>
		);
	},
};
