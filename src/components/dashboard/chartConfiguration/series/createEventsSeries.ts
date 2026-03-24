import type { EventType } from '@apiTypes/shift';
import type { EventDataTuple } from '@chartsTypes/chartTypes';
import { eventsColors } from '@constants/colors';
import { TYPE_TO_ROW } from '@constants/eventMap';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import { format, graphic, type CustomSeriesOption } from 'echarts';
import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from 'echarts';

export function createEventsSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'events',
    type: 'custom',
    xAxisIndex: 3,
    yAxisIndex: 3,
    renderItem: renderEventsItem,
    data: data,
    encode: {
      x: [2, 3],
    },
    tooltip: {
      formatter: (params: { value: EventDataTuple }) => {
        const [, label, start, end, , comment] = params.value;

        const interval = `${format.encodeHTML(`${formatTimeHHMM(start)} - ${formatTimeHHMM(end)}`)}`;
        const labelStr = `${format.encodeHTML(label)}`;
        const commentStr = comment ? `Комментарий: ${format.encodeHTML(`${comment}`)}` : '';
        const tooltip = `${interval}<br/><b>${labelStr}</b></br>${commentStr}`;
        return tooltip;
      },
    },
  };
}

type CartesianCoordSys = {
  type: 'cartesian2d';
  x: number;
  y: number;
  width: number;
  height: number;
};
export function renderEventsItem(
  params: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
) {
  const start = api.value(2);
  const end = api.value(3);
  const type = api.value(4) as EventType;
  const color = api.value(7);

  const rowIndex = TYPE_TO_ROW[type] ?? 0;

  const startCoord = api.coord([start, rowIndex]);
  const endCoord = api.coord([end, rowIndex]);

  const sizeArr = api.size ? api.size([0, 1]) : undefined;
  const barHeight = Array.isArray(sizeArr) ? (sizeArr[1] ?? 20) * 0.6 : 20 * 0.6;

  const rectShape = {
    x: startCoord[0],
    y: startCoord[1] - barHeight / 2,
    width: endCoord[0] - startCoord[0],
    height: barHeight,
  };
  const coordSys = params.coordSys as CartesianCoordSys;
  const clipped = graphic.clipRectByRect(rectShape, {
    x: coordSys.x,
    y: coordSys.y,
    width: coordSys.width,
    height: coordSys.height,
  });

  if (!clipped) return null;

  return {
    type: 'rect',
    shape: clipped,
    style: { fill: color },
    info: { type, start, end, raw: api.value(0) },
  };
}

export const fakeEventsSeries = Object.entries(eventsColors).map(([name, color]) => ({
  name: name,
  type: 'line',
  data: [],
  showInLegend: true,
  itemStyle: { color: color },
  barWidth: 0,
  tooltip: { show: false },
  lineStyle: { width: 0 },
  symbol: 'none',
}));
