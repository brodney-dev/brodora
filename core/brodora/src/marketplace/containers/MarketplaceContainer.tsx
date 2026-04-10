import { Stack } from "@brodora/ui";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";

export const MarketplaceContainer = () => {
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
					title="Marketplace"
					description="Discover and install apps for Brodora."
				/>
			</Stack>
		</Container>
	);
};
