export function formatSequenceNumber(value: number) {
  return String(value).padStart(2, "0");
}
