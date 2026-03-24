import type { ShiftData } from '@apiTypes/shift';
import type {
  DashboardData,
  EventDataTuple,
  LineSpeed,
  Products,
  ProductsCounter,
} from '@chartsTypes/chartTypes';
import { themeColors, productsColors, eventsColors } from '@constants/colors';
import { getTimestampFromISO, getDate } from '@utils/helpers/timeHelpers';

export type SpeedPoint = {
  value: [number, number];
  interval: [number, number];
};

export function prepareShiftData(rawData: ShiftData): DashboardData {
  const date = getDate(rawData.shift.start);
  const start = getTimestampFromISO(rawData.shift.start);
  const end = getTimestampFromISO(rawData.shift.end);

  const products: Products[] = rawData.products.map((item) => {
    return {
      value: [getTimestampFromISO(item.start), getTimestampFromISO(item.end), item.name],
      itemStyle: { color: productsColors[item.id] || themeColors.primary },
    };
  });

  const productsCounter: ProductsCounter[] = rawData.productCounter.map((item) => {
    return [getTimestampFromISO(item.time), item.value];
  });

  const lineSpeed: LineSpeed[] = rawData.lineSpeed.map((item) => {
    return [getTimestampFromISO(item.time), item.value];
  });

  const speedSetpoint: SpeedPoint[] = rawData.speedSetpoint.reduce((acc: SpeedPoint[], item) => {
    const start = getTimestampFromISO(item.start);
    const end = getTimestampFromISO(item.end);
    const value = item.value;

    return [
      ...acc,
      {
        value: [start, value],
        interval: [start, end],
      },
      {
        value: [end, value],
        interval: [start, end],
      },
    ];
  }, []);

  function buildSpeedIntervals() {
    const lineSpeed = rawData.lineSpeed;
    const speedSetpoint = rawData.speedSetpoint;
    const times: Set<number> = new Set();

    lineSpeed.forEach((p) => times.add(getTimestampFromISO(p.time)));
    speedSetpoint.forEach((s) => {
      times.add(getTimestampFromISO(s.start));
      times.add(getTimestampFromISO(s.end));
    });

    const sorted = Array.from(times).sort((a, b) => a - b);

    function getSetpoint(t: number) {
      const sp = speedSetpoint.find(
        (s) => t >= getTimestampFromISO(s.start) && t < getTimestampFromISO(s.end),
      );
      return sp ? sp.value : null;
    }

    function getSpeed(t: number) {
      for (let i = 0; i < lineSpeed.length - 1; i++) {
        const p1 = lineSpeed[i];
        const p2 = lineSpeed[i + 1];

        const t1 = getTimestampFromISO(p1.time);
        const t2 = getTimestampFromISO(p2.time);

        if (t >= t1 && t <= t2) {
          if (t1 === t2) return p1.value;

          const ratio = (t - t1) / (t2 - t1);
          return p1.value + ratio * (p2.value - p1.value);
        }
      }
      return null;
    }

    const result = [];
    const EPS = 1e-6;

    for (let i = 0; i < sorted.length - 1; i++) {
      const t1 = sorted[i];
      const t2 = sorted[i + 1];

      const v1 = getSpeed(t1);
      const v2 = getSpeed(t2);
      const S = getSetpoint(t1);

      if (v1 == null || v2 == null || S == null) continue;

      const diff1 = v1 - S;
      const diff2 = v2 - S;

      if (Math.abs(diff1) < EPS && diff2 < 0) {
        result.push({
          start: t1,
          end: t2,
          state: 'below',
        });
        continue;
      }

      if (diff1 * diff2 < 0) {
        const tCross = t1 + ((t2 - t1) * (S - v1)) / (v2 - v1);

        result.push({
          start: t1,
          end: tCross,
          state: diff1 < 0 ? 'below' : 'above',
        });

        result.push({
          start: tCross,
          end: t2,
          state: diff2 < 0 ? 'below' : 'above',
        });

        continue;
      }

      result.push({
        start: t1,
        end: t2,
        state: diff1 < 0 ? 'below' : 'above',
      });
    }

    const merged = [];

    for (const curr of result) {
      const prev = merged[merged.length - 1];

      if (prev && prev.state === curr.state && prev.end === curr.start) {
        prev.end = curr.end;
      } else {
        merged.push({ ...curr });
      }
    }

    return merged;
  }

  const events: EventDataTuple[] = rawData.events.map((item, index) => [
    index,
    item.label,
    getTimestampFromISO(item.start),
    getTimestampFromISO(item.end),
    item.type,
    item.comment,
    item.id,
    eventsColors[item.type],
  ]);
  const speedIntervals = buildSpeedIntervals();

  const speedVisualMapData = speedIntervals.map((item) => {
    if (item.state === 'above') {
      return { gt: item.start, lte: item.end, color: themeColors.primary };
    } else {
      return { gt: item.start, lte: item.end, color: themeColors.danger };
    }
  });

  const getSpeedMarkAreaData = () => {
    const result: { xAxis: number }[][] = [];
    speedIntervals.forEach((item) => {
      if (item.state === 'below') {
        result.push([{ xAxis: item.start }, { xAxis: item.end }]);
      }
    });
    return result;
  };

  const speedMarkAreaData = getSpeedMarkAreaData();

  return {
    date,
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
