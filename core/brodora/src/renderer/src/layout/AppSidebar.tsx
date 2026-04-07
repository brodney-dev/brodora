import { ChevronDown } from "@brodora/icons";
import {
	Box,
	Divider,
	NavItem,
	NavItemProps,
	Stack,
	useTheme,
} from "@brodora/ui";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDevApps } from "../library/useDevApps";
import { useLibraryApps } from "../library/useLibraryApps";
import { ProfileMenu } from "./ProfileMenu";

const sidebarNavSx = {
	padding: "0.125rem 0.4rem",
	fontSize: "0.6875rem",
	lineHeight: 1.2,
	borderRadius: "2px",
	width: "100%",
	gap: "0.35rem",
} as const;

const NavSection = ({
	items,
	title,
}: {
	items: (NavItemProps & { onClick: () => void })[];
	title: string;
}) => {
	const [open, setOpen] = React.useState(true);

	if (items.length === 0) {
		return null;
	}

	return (
		<Stack sx={{ gap: 0.5 }}>
			<Divider sx={{ width: "100%", flexShrink: 0, my: 0.25 }} />

			<NavItem
				fullWidth
				sx={sidebarNavSx}
				endNode={
					<ChevronDown
						size={14}
						style={{
							transform: open ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",
						}}
					/>
				}
				onClick={() => setOpen(!open)}
			>
				{`(${items.length}) ${title}`}
			</NavItem>
			{open && (
				<Stack>
					{items.map((app) => {
						return (
							<NavItem key={`catalog-${app.id}`} sx={sidebarNavSx} {...app}>
								{app.name}
							</NavItem>
						);
					})}
				</Stack>
			)}
		</Stack>
	);
};

export function AppSidebar() {
	const { colors } = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const [query] = React.useState("");

	const { rows: devApps } = useDevApps();
	const filteredDevApps = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return devApps;
		}
		return devApps.filter(
			(a) =>
				a.name.toLowerCase().includes(q) || a.appId.toLowerCase().includes(q),
		);
	}, [devApps, query]);

	const { rows: catalogApps } = useLibraryApps();
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
				active={location.pathname === "/library"}
				onClick={() => navigate("/library")}
			>
				Home
			</NavItem>
			<NavSection
				items={filteredCatalogApps.map((app) => ({
					name: app.name,
					id: app.id.toString(),
					active: location.pathname === `/library/app/${app.id}`,
					onClick: () => navigate(`/library/app/${app.id}`),
				}))}
				title="LIBRARY"
			/>
			<NavSection
				items={filteredDevApps.map((app) => ({
					name: app.name,
					id: app.id.toString(),
					active: location.pathname === `/library/dev/${app.id}`,
					onClick: () => navigate(`/library/dev/${app.id}`),
				}))}
				title="DEV APPS"
			/>
		</Stack>
	);
}
