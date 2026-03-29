/** Default px multiplier: `theme.spacing(n)` → `n × spacingUnit` px. */
export const defaultSpacingUnit = 8;

export function createSpacing(spacingUnit: number): (value: number) => string {
  return (value: number) => `${value * spacingUnit}px`;
}
