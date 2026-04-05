import { ChevronDown } from "@brodora/icons";
import { Box, Divider, NavItem, Stack, useTheme } from "@brodora/ui";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLibraryApps } from "../library/useLibraryApps";
import { ProfileMenu } from "./ProfileMenu";

/** Hardcoded installed apps until a real catalog exists. */
const LIBRARY_APPS: { id: string; label: string; to: string }[] = [
	{ id: "test-app", label: "Test app", to: "/library/app/test-app" },
];

const sidebarNavSx = {
	padding: "0.125rem 0.4rem",
	fontSize: "0.6875rem",
	lineHeight: 1.2,
	borderRadius: "2px",
	width: "100%",
	gap: "0.35rem",
} as const;

export function AppSidebar() {
	const { colors } = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const [query] = React.useState("");

	const filteredInstalled = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return LIBRARY_APPS;
		}
		return LIBRARY_APPS.filter((app) => app.label.toLowerCase().includes(q));
	}, [query]);

	const catalogApps = useLibraryApps();
	const filteredCatalogApps = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return catalogApps;
		}
		return catalogApps.filter(
			(a) =>
				a.name.toLowerCase().includes(q) || a.appId.toLowerCase().includes(q),
		);
	}, [catalogApps, query]);

	const [installedAppsOpen, setInstalledAppsOpen] = React.useState(true);
	const [catalogAppsOpen, setCatalogAppsOpen] = React.useState(false);

	return (
		<Stack
			sx={{
				width: "12rem",
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				minHeight: 0,
				gap: 0.5,
				backgroundColor: colors.background.main,
			}}
		>
			<Box sx={{ width: "100%", flexShrink: 0, mb: 0.5 }}>
				<ProfileMenu fullWidth />
			</Box>
			<Divider sx={{ width: "100%", flexShrink: 0, my: 0.25 }} />

			<NavItem
				fullWidth
				sx={sidebarNavSx}
				endNode={
					<ChevronDown
						size={14}
						style={{
							transform: installedAppsOpen ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",
						}}
					/>
				}
				onClick={() => setInstalledAppsOpen(!installedAppsOpen)}
			>
				{`(${LIBRARY_APPS.length}) INSTALLED`}
			</NavItem>
			{installedAppsOpen ? (
				<Stack>
					{filteredInstalled.map((app) => {
						const active = location.pathname === app.to;
						return (
							<NavItem
								key={app.id}
								active={active}
								fullWidth
								sx={sidebarNavSx}
								onClick={() => navigate(app.to)}
							>
								{app.label}
							</NavItem>
						);
					})}
				</Stack>
			) : null}

			<Divider sx={{ width: "100%", flexShrink: 0, my: 0.25 }} />

			<NavItem
				fullWidth
				sx={sidebarNavSx}
				endNode={
					<ChevronDown
						size={14}
						style={{
							transform: catalogAppsOpen ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",
						}}
					/>
				}
				onClick={() => setCatalogAppsOpen(!catalogAppsOpen)}
			>
				{`(${catalogApps.length}) LIBRARY`}
			</NavItem>
			{catalogAppsOpen && (
				<Stack>
					{filteredCatalogApps.map((app) => {
						const to = `/library/catalog/${app.id}`;
						const active = location.pathname === to;
						return (
							<NavItem
								key={`catalog-${app.id}`}
								active={active}
								fullWidth
								sx={sidebarNavSx}
								onClick={() => navigate(to)}
							>
								{app.name}
							</NavItem>
						);
					})}
				</Stack>
			)}
		</Stack>
	);
}
