import { Box, Button, Divider, Stack, Typography, useTheme } from "@brodora/ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const NAV: { path: string; label: string }[] = [
	{ path: "/", label: "Home" },
	{ path: "/library", label: "Library" },
];

function pathIsActive(currentPath: string, navPath: string): boolean {
	if (navPath === "/") {
		return currentPath === "/" || currentPath === "";
	}
	return currentPath === navPath;
}

export function AppLayout() {
	const { colors } = useTheme();
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				height: "100%",
				overflow: "hidden",
				backgroundColor: colors.secondary[100],
			}}
		>
			<Box
				as="aside"
				sx={{
					width: "15rem",
					flexShrink: 0,
					display: "flex",
					flexDirection: "column",
					borderRight: `1px solid ${colors.secondary[200]}`,
					backgroundColor: colors.secondary[50],
					py: 3,
					px: 2,
				}}
			>
				<Typography variant="h3" as="div" style={{ marginBottom: "0.25rem" }}>
					Brodora
				</Typography>
				<Typography
					variant="caption"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (theme) => theme.colors.secondary[600] }}
				>
					Desktop app
				</Typography>
				<Divider sx={{ my: 3 }} />
				<Stack spacing={1} style={{ flex: 1 }}>
					{NAV.map((item) => {
						const active = pathIsActive(location.pathname, item.path);
						return (
							<Button
								key={item.path}
								type="button"
								onClick={() => navigate(item.path)}
								sx={{
									width: "100%",
									justifyContent: "flex-start",
									border: active
										? `1px solid ${colors.primary[200]}`
										: "1px solid transparent",
									background: active ? colors.primary[50] : "transparent",
									color: colors.secondary[900],
									fontWeight: active ? 600 : 500,
								}}
							>
								{item.label}
							</Button>
						);
					})}
				</Stack>
			</Box>
			<Box
				as="main"
				sx={{
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					overflow: "auto",
					backgroundColor: "#ffffff",
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
}
