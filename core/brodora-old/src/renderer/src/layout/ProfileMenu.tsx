import { ChevronDown } from "@brodora/icons";
import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuAnchor,
	MenuContent,
	MenuItem,
	MenuTrigger,
} from "@brodora/ui";
import * as O from "fp-ts/Option";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user";

const SETTINGS_PATH = "/settings";

export interface ProfileMenuProps {
	/** Use full-width trigger for the left sidebar (vs compact top bar). */
	fullWidth?: boolean;
}

/**
 * Account menu. Uses a `position: relative` wrapper and high z-index on the panel so
 * the dropdown is not clipped by ancestors.
 */
export function ProfileMenu({ fullWidth = false }: ProfileMenuProps) {
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
			sx={{
				position: "relative",
				zIndex: 200,
				flexShrink: 0,
				display: fullWidth ? "block" : "inline-block",
				verticalAlign: fullWidth ? undefined : "middle",
				width: fullWidth ? "100%" : undefined,
			}}
		>
			<Menu>
				<MenuAnchor
					style={{
						position: "relative",
						display: fullWidth ? "block" : "inline-block",
						verticalAlign: fullWidth ? undefined : "middle",
						width: fullWidth ? "100%" : undefined,
					}}
				>
					<MenuTrigger>
						<Button
							type="button"
							color="secondary"
							startNode={<Avatar alt={user.name} size={22} fallback="?" />}
							endNode={<ChevronDown size={14} aria-hidden />}
							sx={{
								background: (t) => t.colors.background.container,
								color: (t) => t.colors.background.onContainer,
								border: (t) => `1px solid ${t.colors.background.border}`,
							}}
							style={{
								padding: "0.15rem 0.4rem",
								fontSize: "0.6875rem",
								gap: "0.25rem",
								width: fullWidth ? "100%" : undefined,
								justifyContent: fullWidth ? "flex-start" : undefined,
							}}
						>
							{user.name}
						</Button>
					</MenuTrigger>
					<MenuContent
						placement={fullWidth ? "bottom-start" : "bottom-end"}
						sx={{
							zIndex: 5000,
						}}
					>
						<MenuItem onClick={() => navigate(SETTINGS_PATH)}>
							Settings
						</MenuItem>
						<MenuItem onClick={() => void handleLogout()}>Log out</MenuItem>
					</MenuContent>
				</MenuAnchor>
			</Menu>
		</Box>
	);
}
