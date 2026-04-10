import { Box, Stack } from "@brodora/ui";
import { AppSidebar } from "./AppSidebar";

const cornerRingSizesPx = [400, 600, 800] as const;

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: (theme) => theme.colors.background.main,
				height: "100vh",
				minHeight: 0,
				overflow: "hidden",
				position: "relative",
				boxSizing: "border-box",
			}}
		>
			<AppSidebar />
			<Stack
				sx={{
					position: "relative",
					flex: 1,
					minHeight: 0,
					minWidth: 0,
					overflow: "hidden",
				}}
			>
				<Box
					aria-hidden
					sx={{
						position: "absolute",
						inset: 0,
						zIndex: 0,
						pointerEvents: "none",
						overflow: "hidden",
					}}
				>
					{cornerRingSizesPx.map((size) => (
						<Box
							key={size}
							sx={{
								position: "absolute",
								left: "100%",
								top: "100%",
								width: size,
								height: size,
								transform: "translate(-50%, -50%)",
								borderRadius: "50%",
								border: (theme) => `1px solid ${theme.colors.primary.border}`,
								opacity: 0.12,
							}}
						/>
					))}
				</Box>
				<Stack
					sx={{
						position: "relative",
						zIndex: 1,
						flex: 1,
						minHeight: 0,
						minWidth: 0,
						overflowX: "hidden",
						overflowY: "auto",
					}}
				>
					{children}
				</Stack>
			</Stack>
		</Stack>
	);
};
