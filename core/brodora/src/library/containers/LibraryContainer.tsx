import { Box, Stack, Tab, Tabs } from "@brodora/ui";
import { AppCard } from "../../components/AppCard";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";

const mockApps = [
	{
		id: 1,
		name: "App 1",
		description: "Description 1",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},
	{
		id: 2,
		name: "App 2",
		description: "Description 2",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},

	{
		id: 3,
		name: "App 3",
		description: "Description 3",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},
	{
		id: 4,
		name: "App 4",
		description: "Description 4",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},
	{
		id: 5,
		name: "App 5",
		description: "Description 5",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},
	{
		id: 6,
		name: "App 6",
		description: "Description 6",
		icon: "https://picsum.photos/400/100",
		installed: true,
	},
	{
		id: 7,
		name: "App 7",
		description: "Description 7",
		icon: "https://picsum.photos/400/100",
		installed: false,
	},
	{
		id: 8,
		name: "App 8",
		description: "Description 8",
		icon: "https://picsum.photos/400/100",
		installed: false,
	},
];

export const LibraryContainer = () => {
	return (
		<Container>
			<Stack
				direction="column"
				sx={{
					padding: (theme) => theme.spacing(4),
					width: "100%",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					gap: (theme) => theme.spacing(2),
				}}
			>
				<PageHeader
					title="Library"
					description="Your installed Brodora apps and services."
				/>
				<Stack
					direction="row"
					sx={{
						width: "100%",
						alignItems: "center",
						borderBottom: (theme) => `1px solid ${theme.colors.primary.border}`,
						position: "sticky",
						top: 0,
						zIndex: 10,
						background: (theme) => theme.colors.background.main,
					}}
				>
					<Tabs defaultValue="all">
						<Tab value="all">All</Tab>
						<Tab value="installed">Installed</Tab>
					</Tabs>
				</Stack>
				<Box
					sx={{
						width: "100%",
						display: "grid",
						gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
						gap: (theme) => theme.spacing(2),
					}}
				>
					{mockApps.map((app) => (
						<AppCard key={app.id} app={app} />
					))}
				</Box>
			</Stack>
		</Container>
	);
};
