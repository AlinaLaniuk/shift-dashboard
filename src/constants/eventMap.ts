import type { EventType } from "@apiTypes/shift";

export const EVENTS_MAP: { key: EventType; index: number; label: string }[] = [
  { key: 'WORK', index: 0, label: 'Работа' },
  { key: 'STOP', index: 1, label: 'Остановка' },
  { key: 'LOW_SPEED', index: 2, label: 'Пониженная скорость' },
  { key: 'STANDARD_OPERATION', index: 3, label: 'Стандартная операция' },
  { key: 'CIP', index: 4, label: 'СИП' },
];

export const TYPE_TO_ROW: Record<EventType, number> = EVENTS_MAP.reduce((acc, ev) => {
  acc[ev.key] = ev.index;
  return acc;
}, {} as Record<EventType, number>);
