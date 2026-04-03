import {
	Box,
	Button,
	Card,
	CardBody,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@brodora/ui";
import * as React from "react";

export const USERNAME_SETTING_KEY = "username";

type IntroUsernamePageProps = {
	onComplete: () => void;
};

export function IntroUsernamePage({ onComplete }: IntroUsernamePageProps) {
	const { colors } = useTheme();
	const [username, setUsername] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [submitting, setSubmitting] = React.useState(false);

	async function handleSubmit(e: React.FormEvent): Promise<void> {
		e.preventDefault();
		const trimmed = username.trim();
		if (!trimmed) {
			setError("Enter a username to continue.");
			return;
		}
		setError(null);
		setSubmitting(true);
		try {
			await window.api.settings.set({
				key: USERNAME_SETTING_KEY,
				value: trimmed,
			});
			onComplete();
		} catch (error) {
			console.error("Error saving username", error);
			setError("Could not save. Try again.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Box
			sx={{
				minHeight: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "2rem",
				backgroundColor: colors.secondary[100],
			}}
		>
			<Card sx={{ width: "100%", maxWidth: "28rem" }}>
				<CardBody>
					<form onSubmit={(e) => void handleSubmit(e)}>
						<Stack spacing={3}>
							<div>
								<Typography
									variant="h2"
									as="h1"
									style={{ margin: "0 0 0.35rem" }}
								>
									Welcome to Brodora
								</Typography>
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: 0 }}
									sx={{ color: (theme) => theme.colors.secondary[600] }}
								>
									Choose a username to get started. You can change it later in
									settings.
								</Typography>
							</div>
							<TextField
								label="Username"
								value={username}
								onChange={(ev) => setUsername(ev.target.value)}
								autoFocus
								fullWidth
								disabled={submitting}
								error={Boolean(error)}
								helperText={error ?? undefined}
							/>
							<Button type="submit" disabled={submitting}>
								{submitting ? "Saving…" : "Continue"}
							</Button>
						</Stack>
					</form>
				</CardBody>
			</Card>
		</Box>
	);
}
