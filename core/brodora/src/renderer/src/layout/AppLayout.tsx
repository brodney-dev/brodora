import { Box, useTheme } from "@brodora/ui";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
	const { colors, shape } = useTheme();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				minWidth: 0,
				overflow: "hidden",
				backgroundColor: colors.background.main,
				p: 1.25,
				boxSizing: "border-box",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flex: 1,
					minHeight: 0,
					minWidth: 0,
					gap: 1,
				}}
			>
				<AppSidebar />
				<Box
					sx={{
						flex: 1,
						minWidth: 0,
						minHeight: 0,
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: colors.neutral.border,
						borderRadius: `${shape.borderRadius}px`,
						backgroundColor: colors.background.container,
					}}
				>
					<Box
						sx={{
							flex: 1,
							minHeight: 0,
							minWidth: 0,
							overflow: "auto",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
