// Utility number helpers
export function sanitizeAmount(raw: string, min = 1): number {
  if (raw === '') return 1;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return min;
  return Math.max(parsed, min);
}

export default sanitizeAmount;
