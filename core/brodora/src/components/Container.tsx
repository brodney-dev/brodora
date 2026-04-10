import { Box } from "@brodora/ui";

export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			sx={{
				margin: "0 auto",
				width: "100%",
				minWidth: 0,
			}}
		>
			{children}
		</Box>
	);
};
