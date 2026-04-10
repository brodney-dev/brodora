import { Stack } from "@brodora/ui";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";

export const ProfileContainer = () => {
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
					title="Profile"
					description="Your account and preferences."
				/>
			</Stack>
		</Container>
	);
};
