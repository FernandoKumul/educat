export function formatNumber(number: number) {
  const rounded = Math.round(number * 10) / 10;
  return rounded % 1 === 0 ? `${rounded}.0` : rounded;
}