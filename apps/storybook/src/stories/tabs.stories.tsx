import { Tab, TabList, TabPanel, Tabs, Typography } from "@brodora/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<TabList>
					<Tab value="account">Account</Tab>
					<Tab value="security">Security</Tab>
					<Tab value="billing">Billing</Tab>
				</TabList>
			</>
		),
	},
	render: () => (
		<Tabs defaultValue="account">
			<TabList>
				<Tab value="account">Account</Tab>
				<Tab value="security">Security</Tab>
				<Tab value="billing">Billing</Tab>
			</TabList>
			<TabPanel value="account">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Account settings content. Use arrow keys to move between tabs.
				</Typography>
			</TabPanel>
			<TabPanel value="security">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Security and sessions.
				</Typography>
			</TabPanel>
			<TabPanel value="billing">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Plans and invoices.
				</Typography>
			</TabPanel>
		</Tabs>
	),
};

export const Controlled: Story = {
	args: {
		children: (
			<>
				<TabList>
					<Tab value="a">Alpha</Tab>
					<Tab value="b">Beta</Tab>
					<Tab value="c">Gamma</Tab>
				</TabList>
			</>
		),
	},
	render: function ControlledTabs() {
		const [value, setValue] = React.useState("b");
		return (
			<Tabs value={value} onValueChange={setValue}>
				<TabList>
					<Tab value="a">Alpha</Tab>
					<Tab value="b">Beta</Tab>
					<Tab value="c">Gamma</Tab>
				</TabList>
				<TabPanel value="a">
					<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
						Panel A (controlled: {value})
					</Typography>
				</TabPanel>
				<TabPanel value="b">
					<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
						Panel B
					</Typography>
				</TabPanel>
				<TabPanel value="c">
					<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
						Panel C
					</Typography>
				</TabPanel>
			</Tabs>
		);
	},
};

export const DisabledTab: Story = {
	args: {
		children: (
			<>
				<TabList>
					<Tab value="one">Available</Tab>
					<Tab value="two" disabled>
						Disabled
					</Tab>
					<Tab value="three">Another</Tab>
				</TabList>
			</>
		),
	},
	render: () => (
		<Tabs defaultValue="one">
			<TabList>
				<Tab value="one">Available</Tab>
				<Tab value="two" disabled>
					Disabled
				</Tab>
				<Tab value="three">Another</Tab>
			</TabList>
			<TabPanel value="one">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					First panel.
				</Typography>
			</TabPanel>
			<TabPanel value="two">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Not reachable when disabled.
				</Typography>
			</TabPanel>
			<TabPanel value="three">
				<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
					Third panel.
				</Typography>
			</TabPanel>
		</Tabs>
	),
};
