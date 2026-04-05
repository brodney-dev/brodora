import { Typography } from "@brodora/ui";
import * as React from "react";

type ElectronVersions = {
	electron?: string;
	chrome?: string;
	node?: string;
};

function readVersions(): string {
	const proc = (
		window as unknown as {
			electron?: { process?: { versions?: ElectronVersions } };
		}
	).electron?.process?.versions;
	if (!proc) {
		return "";
	}
	const parts = [
		proc.electron != null ? `Electron ${proc.electron}` : null,
		proc.chrome != null ? `Chrome ${proc.chrome}` : null,
		proc.node != null ? `Node ${proc.node}` : null,
	].filter(Boolean);
	return parts.join(" · ");
}

export default function Versions() {
	const [line, setLine] = React.useState("");

	React.useEffect(() => {
		setLine(readVersions());
	}, []);

	if (!line) {
		return null;
	}

	return (
		<Typography
			variant="caption"
			as="p"
			style={{ margin: 0 }}
			sx={{ color: (theme) => theme.colors.secondary.onMain }}
		>
			{line}
		</Typography>
	);
}
