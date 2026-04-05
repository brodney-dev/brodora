import { Box, useTheme } from "@brodora/ui";
import { Outlet } from "react-router-dom";
import { AppSideNav } from "./AppSideNav";

export function AppLayout() {
	const { colors } = useTheme();

	return (
		<Box
			sx={{
				display: "flex",
				height: "100%",
				overflow: "hidden",
				backgroundColor: colors.background.main,
			}}
		>
			<AppSideNav />
			<Box
				as="main"
				sx={{
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					overflow: "auto",
					backgroundColor: colors.background.container,
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
}
