import type { EventType } from '@apiTypes/shift';

export type SpeedVisualMapData = {
  gt: number;
  lte: number;
  color: string;
}[];

export type EventDataTuple = [
  index: number,
  label: string,
  start: number,
  end: number,
  type: EventType,
  comment: string | null,
  id: string,
  color: string,
];
export type Products = {
  value: [start: number, end: number, name: string];
  itemStyle: { color: string };
};
export type ProductsCounter = [time: number, count: number];
export type LineSpeed = [time: number, speed: number];
export type SpeedSetpoint = {
  value: [time: number, speed: number];
  interval: [start: number, end: number];
};
export type SpeedMarkAreaData = { xAxis: number }[][];
export interface DashboardData {
  start: number;
  end: number;
  products: Products[];
  productsCounter: ProductsCounter[];
  lineSpeed: LineSpeed[];
  speedSetpoint: SpeedSetpoint[];
  events: EventDataTuple[];
  speedVisualMapData: {
    gt: number;
    lte: number;
    color: string;
  }[];
  speedMarkAreaData: SpeedMarkAreaData;
}
