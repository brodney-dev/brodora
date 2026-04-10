import { AppleIcon, AppWindowIcon, ShoppingBagIcon } from "@brodora/icons";
import {
	Avatar,
	Divider,
	Menu,
	MenuAnchor,
	MenuContent,
	MenuItem,
	MenuSeparator,
	MenuTrigger,
	Stack,
	useTheme,
} from "@brodora/ui";
import { useLocation, useNavigate } from "react-router-dom";

export const AppSidebar = () => {
	const theme = useTheme();

	const pathname = useLocation().pathname;

	const isActive = (path: string) => pathname.includes(path);
	const navigate = useNavigate();

	return (
		<Stack
			direction="column"
			sx={{
				position: "relative",
				flexShrink: 0,
				width: 75,
				minHeight: 0,
				alignSelf: "stretch",
				zIndex: 10,
				borderRight: (t) => `1px solid ${t.colors.background.border}`,
				background: (t) => t.colors.background.container,
				justifyContent: "center",
				alignItems: "center",
				paddingTop: (t) => t.spacing(4),
				paddingBottom: (t) => t.spacing(2),
				boxSizing: "border-box",
				overflow: "visible",
			}}
		>
			<Stack
				direction="column"
				sx={{
					flex: 1,
					minHeight: 0,
					width: "100%",
					alignItems: "center",
					gap: (t) => t.spacing(4),
					overflowY: "auto",
				}}
			>
				<AppWindowIcon
					color={
						pathname === "/"
							? theme.colors.primary.main
							: theme.colors.inverse.main
					}
					cursor="pointer"
					onClick={() => navigate("/")}
				/>
				<ShoppingBagIcon
					color={
						isActive("/marketpalce")
							? theme.colors.primary.main
							: theme.colors.inverse.main
					}
					cursor="pointer"
					onClick={() => navigate("/marketpalce")}
				/>
				<Divider />
				<AppleIcon color={theme.colors.inverse.main} />
				<AppleIcon color={theme.colors.inverse.main} />
				<AppleIcon color={theme.colors.inverse.main} />
				<AppleIcon color={theme.colors.inverse.main} />
			</Stack>
			<Stack
				direction="column"
				sx={{
					width: "100%",
					alignItems: "center",
					flexShrink: 0,
					paddingTop: (t) => t.spacing(2),
				}}
			>
				<Menu>
					<MenuAnchor
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<MenuTrigger>
							<Avatar
								src="https://github.com/shadcn.png"
								alt="Account menu"
								sx={{ cursor: "pointer" }}
								aria-haspopup="menu"
							/>
						</MenuTrigger>
						<MenuContent
							sx={{
								top: "auto",
								bottom: 0,
								left: "100%",
								right: "auto",
								marginLeft: (t) => t.spacing(1),
								transform: "none",
							}}
						>
							<MenuItem
								onClick={() => {
									navigate("/profile");
								}}
							>
								Profile
							</MenuItem>
							<MenuItem
								onClick={() => {
									navigate("/theme");
								}}
							>
								Theme
							</MenuItem>
							<MenuSeparator />
							<MenuItem
								onClick={() => {
									/* logout TBD */
								}}
							>
								Logout
							</MenuItem>
						</MenuContent>
					</MenuAnchor>
				</Menu>
			</Stack>
		</Stack>
	);
};
