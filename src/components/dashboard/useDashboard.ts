import { useEffect, useState } from 'react';
import type { ShiftData } from '@apiTypes/shift';
import { prepareShiftData } from '@components/dashboard/prepareShiftData';
import { shiftApi } from '@api/shiftApi';
import type { EventDataTuple } from '@chartsTypes/chartTypes';

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
  const [currentEvent, setCurrentEvent] = useState<EventDataTuple | null>(null);

  async function fetchDashboardData() {
    const data = await shiftApi.getShiftData();
    setData(data);
  }

  useEffect(() => {
    (async () => {
      await fetchDashboardData();
    })();
  }, []);

  const dashboardData = prepareShiftData(rawData);

  return {
    dashboardData,
    currentEvent,
    setCurrentEvent,
    fetchDashboardData,
  };
}
