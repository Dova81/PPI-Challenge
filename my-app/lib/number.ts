// Utility number helpers
export function sanitizeAmount(raw: string, min = 0): number {
  // empty input -> 0
  if (raw === "") return 0;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return min;
  return Math.max(parsed, min);
}

export default sanitizeAmount;
