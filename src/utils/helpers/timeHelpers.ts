export function formatTimeHHMM(ms: number): string {
  const date = new Date(ms);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
export function getTimestampFromISO(timeISO: string) {
  return new Date(timeISO).getTime();
}
