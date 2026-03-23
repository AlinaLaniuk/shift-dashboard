export interface TimeInterval {
  start: string;
  end: string;
}

export interface Product extends TimeInterval {
  id: string;
  name: string;
}

export interface ProductCounter {
  time: string;
  value: number;
}

export interface LineSpeed {
  time: string;
  value: number;
}

export interface SpeedSetpoint extends TimeInterval {
  value: number;
}

export type EventType = 'WORK' | 'STOP' | 'LOW_SPEED' | 'STANDARD_OPERATION' | 'CIP';

export interface LineEvent extends TimeInterval {
  id: string;
  type: EventType;
  label: string;
  comment: string | null;
}

export interface Shift {
  start: string;
  end: string;
}

export interface ShiftData {
  shift: Shift;
  products: Product[];
  productCounter: ProductCounter[];
  lineSpeed: LineSpeed[];
  speedSetpoint: SpeedSetpoint[];
  events: LineEvent[];
}
