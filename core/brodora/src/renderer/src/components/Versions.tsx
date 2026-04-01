import { Stack, Typography, useTheme } from "@brodora/ui";
import * as React from "react";

function Versions(): React.JSX.Element {
	const [versions] = React.useState(window.electron.process.versions);
	const { colors } = useTheme();

	return (
		<Stack
			direction="row"
			spacing={2}
			style={{
				flexWrap: "wrap",
				padding: "0.75rem 1rem",
				borderRadius: "0.75rem",
				backgroundColor: colors.secondary[100],
				border: `1px solid ${colors.secondary[200]}`,
			}}
		>
			<Typography
				variant="caption"
				as="span"
				sx={{ color: (theme) => theme.colors.secondary[600] }}
			>
				Electron v{versions.electron}
			</Typography>
			<Typography
				variant="caption"
				as="span"
				sx={{ color: (theme) => theme.colors.secondary[600] }}
			>
				Chromium v{versions.chrome}
			</Typography>
			<Typography
				variant="caption"
				as="span"
				sx={{ color: (theme) => theme.colors.secondary[600] }}
			>
				Node v{versions.node}
			</Typography>
		</Stack>
	);
}

export default Versions;
