import type { SpeedVisualMapData } from '@chartsTypes/chartTypes';
import { EVENTS_MAP } from '@constants/eventMap';

export const grids = [
  { left: 50, right: 50, top: 0, height: '15%' }, // продукты
  { left: 50, right: 50, top: '20%', height: '15%' }, // кол-во
  { left: 50, right: 50, top: '43%', height: '15%' }, // скорость и уставка
  { left: 50, right: 50, top: '65%', height: '15%' }, // события
];

export function createXAxis(start: number, end: number) {
  return [
    {
      gridIndex: 0,
      show: false,
      type: 'time',
      min: start,
      max: end,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    {
      gridIndex: 1,
      type: 'time',
      min: start,
      max: end,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLine: {
        show: false,
        symbol: false,
      },
      axisLabel: {
        show: false,
      },
    },
    {
      gridIndex: 2,
      type: 'time',
      min: start,
      max: end,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLine: {
        show: false,
        symbol: false,
      },
      axisLabel: {
        show: false,
      },
    },
    {
      gridIndex: 3,
      show: true,
      type: 'time',
      min: start,
      max: end,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        formatter: (value: number) =>
          new Date(value).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
    },
  ];
}

export const yAxis = [
  {
    type: 'value',
    min: 0,
    max: 1,
    name: 'Продукты',
    scale: true,
    gridIndex: 0,
    nameLocation: 'middle',
    axisLabel: {
      show: false,
    },
    nameRotate: 90,
    axisLine: {
      show: false,
    },
  },
  {
    type: 'value',
    name: 'Готовая продукция',
    scale: true,
    nameLocation: 'middle',
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    nameRotate: 90,
    gridIndex: 1,
  },
  {
    type: 'value',
    name: 'Скорость / Уставка',
    scale: true,
    nameLocation: 'middle',
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    nameRotate: 90,
    gridIndex: 2,
  },
  {
    type: 'category',
    name: 'События линии',
    scale: true,
    gridIndex: 3,
    nameLocation: 'middle',
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    nameRotate: 90,
    inverse: true,
  },
];

export const getVisualMap = (speedVisualMapData: SpeedVisualMapData) => [
  {
    type: 'piecewise',
    seriesIndex: 2,
    dimension: 0,
    show: false,
    pieces: speedVisualMapData,
  },
];

export const dataZoom = [
  {
    type: 'inside',
    xAxisIndex: [0, 1, 2, 3],
    start: 0,
    end: 100,
    minSpan: 20,
    filterMode: 'weakFilter',
  },
  {
    type: 'slider',
    xAxisIndex: [0, 1, 2, 3],
    start: 0,
    end: 100,
    minSpan: 20,
    filterMode: 'weakFilter',
    bottom: 60,
  },
];

export const legend = {
  show: true,
  orient: 'horizontal',
  bottom: 0,
  left: 'center',
  textStyle: {
    fontSize: 12,
    color: '#333',
  },
  data: [
    { name: 'WORK', icon: 'roundRect' },
    { name: 'STOP', icon: 'roundRect' },
    { name: 'LOW_SPEED', icon: 'roundRect' },
    { name: 'STANDARD_OPERATION', icon: 'roundRect' },
    { name: 'CIP', icon: 'roundRect' },
  ],
  selectedMode: false,
  formatter: function (name: string) {
    return EVENTS_MAP.find((event) => event.key === name)?.label;
  },
};
