import { Stack, Typography } from "@brodora/ui";
import { useParams } from "react-router-dom";
import { useLibraryApps } from "../../library/useLibraryApps";

export function LibraryAppPage() {
	const { id } = useParams<{ id: string }>();
	const { rows } = useLibraryApps();
	const numericId = id != null ? Number.parseInt(id, 10) : Number.NaN;
	const row = rows.find((r) => r.id === numericId);

	return (
		<Stack spacing={2} sx={{ p: 4, flex: 1 }}>
			<Typography variant="h2" as="h1" style={{ margin: 0 }}>
				{row?.name ?? "Library app"}
			</Typography>
			{row ? (
				<Stack spacing={1}>
					<Typography
						variant="body-sm"
						as="p"
						style={{ margin: 0 }}
						sx={{ color: (t) => t.colors.secondary.onMain }}
					>
						{row.appId} · {row.sourceType}
					</Typography>
					<Typography
						variant="body-sm"
						as="p"
						style={{ margin: 0, wordBreak: "break-all" }}
						sx={{ color: (t) => t.colors.secondary.onMain }}
					>
						{row.sourceRef}
					</Typography>
				</Stack>
			) : (
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (t) => t.colors.secondary.onMain }}
				>
					This app is not in your library or the list is still loading.
				</Typography>
			)}
		</Stack>
	);
}
