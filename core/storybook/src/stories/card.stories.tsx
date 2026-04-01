import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography,
} from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		sx: { maxWidth: 360 },
	},
	render: () => (
		<Card sx={{ maxWidth: 360 }}>
			<CardHeader>
				<Typography variant="h3" as="h2" style={{ margin: 0 }}>
					Card title
				</Typography>
			</CardHeader>
			<CardBody>
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Card body content goes here.
				</Typography>
			</CardBody>
			<CardFooter>
				<Button type="button">Primary</Button>
				<Button
					type="button"
					style={{
						background: "#f1f5f9",
						color: "#334155",
						border: "1px solid #cbd5e1",
					}}
				>
					Secondary
				</Button>
			</CardFooter>
		</Card>
	),
};
