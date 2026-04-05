/** `#rrggbb` → `rgba(r,g,b,a)`. Falls back to black if the hex is invalid. */
export function hexToRgba(hex: string, alpha: number): string {
	const normalized = hex.replace("#", "");
	if (normalized.length !== 6) {
		return `rgba(0, 0, 0, ${alpha})`;
	}
	const r = Number.parseInt(normalized.slice(0, 2), 16);
	const g = Number.parseInt(normalized.slice(2, 4), 16);
	const b = Number.parseInt(normalized.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
