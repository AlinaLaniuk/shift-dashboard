import type { SpeedVisualMapData } from '@chartsTypes/chartTypes';

export const grids = [
  { left: 50, right: 50, top: 0, height: '23%' }, // продукты
  { left: 50, right: 50, top: '25%', height: '23%' }, // кол-во
  { left: 50, right: 50, top: '50%', height: '23%' }, // скорость и уставка
  { left: 50, right: 50, top: '75%', height: '23%' }, // события
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
