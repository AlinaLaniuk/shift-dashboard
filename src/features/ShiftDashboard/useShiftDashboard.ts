import { useState } from 'react';
import { shiftMock } from '../../mocks/mocks';
import type { ShiftData } from '@apiTypes/shift';
import { prepareShiftData } from '@features/ShiftDashboard/prepareShiftData';

const defaultData: ShiftData = {
  shift: { start: '', end: '' },
  products: [],
  productCounter: [],
  lineSpeed: [],
  speedSetpoint: [],
  events: [],
};

export function useDataForCharts() {
  const [rawData, setData] = useState(shiftMock);

  const {
    start,
    end,
    products,
    productsCounter,
    lineSpeed,
    speedSetpoint,
    events,
    speedVisualMapData,
    speedMarkAreaData,
  } = prepareShiftData(rawData);

  return {
    start,
    end,
    products,
    productsCounter,
    lineSpeed,
    speedSetpoint,
    events,
    speedVisualMapData,
    speedMarkAreaData,
  };
}
