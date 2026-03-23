import { useEffect, useState } from 'react';
import type { ShiftData } from '@apiTypes/shift';
import { prepareShiftData } from '@components/dashboard/prepareShiftData';
import { shiftApi } from '@api/shiftApi';

const defaultData: ShiftData = {
  shift: { start: '', end: '' },
  products: [],
  productCounter: [],
  lineSpeed: [],
  speedSetpoint: [],
  events: [],
};

export function useDashboard() {
  const [rawData, setData] = useState(defaultData);

  useEffect(() => {
    shiftApi.getShiftData().then((res) => setData(res));
  }, []);

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
