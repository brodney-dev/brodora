import { ChevronDown } from "@brodora/icons";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Menu,
	MenuAnchor,
	MenuContent,
	MenuItem,
	MenuTrigger,
	NavItem,
	Stack,
	Typography,
	useTheme,
} from "@brodora/ui";
import * as O from "fp-ts/Option";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../user";

const MAIN_NAV: { path: string; label: string }[] = [
	{ path: "/", label: "Home" },
	{ path: "/library", label: "Library" },
];

const SETTINGS_PATH = "/settings";

function pathIsActive(currentPath: string, navPath: string): boolean {
	if (navPath === "/") {
		return currentPath === "/" || currentPath === "";
	}
	return currentPath === navPath;
}

const denseNavItemSx = {
	padding: "0.3125rem 0.5rem",
	fontSize: "0.8125rem",
	lineHeight: 1.35,
	gap: "0.375rem",
} as const;

export function AppSideNav() {
	const { colors } = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useUser();

	async function handleLogout(): Promise<void> {
		const ok = await window.api.users.logout(undefined);
		if (O.isNone(ok)) {
			return;
		}
		navigate("/");
	}

	return (
		<Box
			as="aside"
			sx={{
				width: "11.5rem",
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				height: "100%",
				minHeight: 0,
				borderRight: `1px solid ${colors.neutral.border}`,
				backgroundColor: colors.secondary.container,
				py: 1.5,
				px: 1.25,
			}}
		>
			<Box sx={{ flexShrink: 0, mb: 1 }}>
				<Menu>
					<MenuAnchor style={{ display: "block", width: "100%" }}>
						<MenuTrigger>
							<Button
								type="button"
								color="secondary"
								startNode={<Avatar alt={user.name} size={28} fallback="?" />}
								endNode={<ChevronDown size={16} aria-hidden />}
								style={{
									width: "100%",
									justifyContent: "space-between",
									padding: "0.05rem 0.25rem",
									fontSize: "0.8125rem",
								}}
							>
								<span
									style={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										flex: 1,
										textAlign: "left",
									}}
								>
									{user.name}
								</span>
							</Button>
						</MenuTrigger>
						<MenuContent placement="bottom-start">
							<MenuItem onClick={() => navigate(SETTINGS_PATH)}>
								Settings
							</MenuItem>
							<MenuItem onClick={() => void handleLogout()}>Log out</MenuItem>
						</MenuContent>
					</MenuAnchor>
				</Menu>
			</Box>

			<Stack spacing={0.25} style={{ flex: 1, minHeight: 0 }}>
				{MAIN_NAV.map((item) => {
					const active = pathIsActive(location.pathname, item.path);
					return (
						<NavItem
							key={item.path}
							active={active}
							fullWidth
							sx={denseNavItemSx}
							onClick={() => navigate(item.path)}
						>
							{item.label}
						</NavItem>
					);
				})}
			</Stack>

			<Box sx={{ flexShrink: 0, pt: 1 }}>
				<Divider sx={{ my: 1.25 }} />
				<Typography
					variant="h3"
					as="div"
					style={{
						marginBottom: "0.125rem",
						fontSize: "1rem",
						lineHeight: 1.25,
						fontWeight: 600,
					}}
				>
					Brodora
				</Typography>
			</Box>
		</Box>
	);
}
