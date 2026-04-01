"use client";

import { ThemeProvider } from "@brodora/ui";
import type * as React from "react";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
