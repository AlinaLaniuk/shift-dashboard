export function formatTimeHHMM(ms: number): string {
  const date = new Date(ms);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
export function getTimestampFromISO(timeISO: string) {
  return new Date(timeISO).getTime();
}
export function getDate(timeISO: string): string {
  if (!timeISO) return '';
  const date = new Date(timeISO);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
