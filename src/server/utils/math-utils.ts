export function isPositiveFinite(v: number): boolean {
  return Number.isFinite(v) && v >= 0;
}