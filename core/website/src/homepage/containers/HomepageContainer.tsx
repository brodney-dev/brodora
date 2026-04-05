"use client";

import { GitBranch } from "@brodora/icons";
import { Box, hexToRgba, Link, Stack, Typography, useTheme } from "@brodora/ui";
import type { CSSProperties, ReactNode } from "react";

const REPO = "https://github.com/brodney-dev/brodora";

function GitHubButtonLink({ children }: { children: ReactNode }) {
	const { colors, shape } = useTheme();
	const base: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.5rem",
		padding: "0.625rem 1.25rem",
		borderRadius: shape.borderRadius,
		border: `1px solid ${colors.primary.border}`,
		background: colors.primary.main,
		color: colors.primary.onMain,
		fontSize: "0.9375rem",
		fontWeight: 600,
		textDecoration: "none",
		width: "fit-content",
		cursor: "pointer",
		transition:
			"background 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
	};
	return (
		<a
			href={REPO}
			target="_blank"
			rel="noopener noreferrer"
			style={base}
			onMouseEnter={(e) => {
				e.currentTarget.style.background = colors.primary.onContainer;
				e.currentTarget.style.borderColor = colors.primary.border;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.background = colors.primary.main;
				e.currentTarget.style.borderColor = colors.primary.border;
			}}
		>
			<GitBranch size={18} strokeWidth={2} />
			{children}
		</a>
	);
}

export function HomepageContainer() {
	const { colors, shape } = useTheme();

	return (
		<Box
			as="div"
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				background: `linear-gradient(165deg, ${colors.primary.container} 0%, ${colors.secondary.container} 42%, ${colors.background.main} 100%)`,
			}}
		>
			<Box
				as="header"
				sx={{
					position: "sticky",
					top: 0,
					zIndex: 10,
					borderBottom: `1px solid ${colors.neutral.border}`,
					background: "rgba(248, 250, 252, 0.85)",
					backdropFilter: "blur(10px)",
				}}
			>
				<Box
					sx={{
						maxWidth: "72rem",
						margin: "0 auto",
						padding: "1rem clamp(1rem, 4vw, 2rem)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "1rem",
					}}
				>
					<a
						href="/"
						style={{
							textDecoration: "none",
							color: colors.secondary.onContainer,
						}}
					>
						<Typography variant="title" as="span" sx={{ fontSize: "1.35rem" }}>
							Brodora
						</Typography>
					</a>
					<Link
						href={REPO}
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							fontSize: "0.875rem",
							fontWeight: 500,
							color: colors.secondary.onMain,
							textDecoration: "none",
						}}
					>
						GitHub
					</Link>
				</Box>
			</Box>

			<Box as="main" sx={{ flex: 1, width: "100%" }}>
				<Box
					sx={{
						maxWidth: "72rem",
						margin: "0 auto",
						padding: "clamp(2.5rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem) 0",
					}}
				>
					<Stack spacing={4} sx={{ maxWidth: "40rem" }}>
						<Typography variant="display" as="h1" sx={{ margin: 0 }}>
							Brodora
						</Typography>
						<Typography
							variant="body"
							as="p"
							sx={{
								fontSize: "1.125rem",
								lineHeight: 1.65,
								color: colors.secondary.onMain,
								margin: 0,
							}}
						>
							Brodora is an open, interconnected ecosystem of software—tools and
							libraries that are designed and grown together so they fit each
							other well. The aim is compound value: each piece works on its
							own, and works better alongside the rest.
						</Typography>
					</Stack>
				</Box>

				<Box
					sx={{
						maxWidth: "72rem",
						margin: "0 auto",
						padding:
							"clamp(3rem, 7vw, 4.5rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 10vw, 6rem)",
					}}
				>
					<Stack spacing={4}>
						<Box
							sx={{
								background: colors.background.container,
								border: `1px solid ${colors.neutral.border}`,
								borderRadius: `${shape.borderRadius}px`,
								boxShadow: `0 1px 2px ${colors.neutral.border}, 0 12px 40px -16px ${hexToRgba(colors.secondary.onContainer, 0.12)}`,
								padding: "clamp(1.5rem, 4vw, 2.25rem)",
							}}
						>
							<Stack spacing={3}>
								<Typography
									variant="h3"
									as="h2"
									sx={{ margin: 0, color: colors.secondary.onContainer }}
								>
									Why it exists
								</Typography>
								<Stack spacing={2}>
									<Typography variant="body-sm" as="p" sx={{ margin: 0 }}>
										Great tools exist everywhere in open source. Brodora is a
										dedicated space to build a family of them under one
										roof—shared conventions, aligned roadmaps, and room for
										pieces to evolve in step. When components share assumptions
										and maintainers share context, the whole becomes more than
										the sum of its parts.
									</Typography>
									<Typography variant="body-sm" as="p" sx={{ margin: 0 }}>
										It is not about replacing what already works for you. It is
										about offering a coherent alternative where integration is
										intentional from the start, and where the ecosystem can
										deepen over time.
									</Typography>
								</Stack>
							</Stack>
						</Box>

						<Box>
							<Typography
								variant="h3"
								as="h2"
								sx={{
									margin: "0 0 1.25rem",
									color: colors.secondary.onContainer,
								}}
							>
								What that makes possible
							</Typography>
							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
									gap: "1rem",
								}}
							>
								{(
									[
										{
											title: "Interconnection",
											body: "Projects are meant to compose; patterns and primitives line up across packages.",
										},
										{
											title: "Shared stewardship",
											body: "Built together, with continuity and clarity for people who use and extend the work.",
										},
										{
											title: "Modularity",
											body: "Adopt one tool or many; the door stays open either way.",
										},
									] as const
								).map((item) => (
									<Box
										key={item.title}
										sx={{
											background: colors.background.container,
											border: `1px solid ${colors.neutral.border}`,
											borderRadius: `${shape.borderRadius}px`,
											borderTop: `3px solid ${colors.primary.main}`,
											padding: "1.25rem 1.35rem",
											boxShadow: `0 1px 2px ${colors.neutral.border}`,
										}}
									>
										<Stack spacing={2}>
											<Typography
												variant="body-sm"
												as="h3"
												sx={{
													margin: 0,
													fontWeight: 600,
													color: colors.secondary.onContainer,
												}}
											>
												{item.title}
											</Typography>
											<Typography
												variant="body-sm"
												as="p"
												sx={{
													margin: 0,
													color: colors.secondary.onMain,
													lineHeight: 1.55,
												}}
											>
												{item.body}
											</Typography>
										</Stack>
									</Box>
								))}
							</Box>
						</Box>

						<Stack spacing={3} sx={{ alignItems: "flex-start" }}>
							<GitHubButtonLink>View on GitHub</GitHubButtonLink>
							<Typography variant="caption" as="p" sx={{ margin: 0 }}>
								Open source, MIT licensed. Contributions and conversation
								welcome.
							</Typography>
						</Stack>
					</Stack>
				</Box>
			</Box>

			<Box
				as="footer"
				sx={{
					marginTop: "auto",
					borderTop: `1px solid ${colors.neutral.border}`,
					background: "rgba(255, 255, 255, 0.6)",
					backdropFilter: "blur(8px)",
				}}
			>
				<Box
					sx={{
						maxWidth: "72rem",
						margin: "0 auto",
						padding: "1.75rem clamp(1rem, 4vw, 2rem)",
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
						alignItems: "flex-start",
					}}
				>
					<Typography variant="title" as="span" sx={{ fontSize: "1.1rem" }}>
						Brodora
					</Typography>
					<Typography variant="caption" as="p" sx={{ margin: 0 }}>
						An interconnected ecosystem of open-source tools.
					</Typography>
					<Link
						href={REPO}
						target="_blank"
						rel="noopener noreferrer"
						sx={{ fontSize: "0.8125rem" }}
					>
						github.com/brodney-dev/brodora
					</Link>
				</Box>
			</Box>
		</Box>
	);
}
