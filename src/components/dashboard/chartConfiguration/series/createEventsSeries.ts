import type { EventDataTuple } from '@chartsTypes/chartTypes';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import { format, type CustomSeriesOption } from 'echarts';
import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from 'echarts';

export function createEventsSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'events',
    type: 'custom',
    xAxisIndex: 3,
    yAxisIndex: 3,
    renderItem: renderEventsItem,
    data: data,
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

const TYPE_TO_ROW: Record<string, number> = {
  WORK: 0,
  STOP: 1,
  LOW_SPEED: 2,
  STANDARD_OPERATION: 3,
  CIP: 4,
};

export function renderEventsItem(
  _params: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
) {
  const start = new Date(api.value(2)).getTime();
  const end = new Date(api.value(3)).getTime();
  const type = api.value(4);
  const color = api.value(7);
  const rowIndex = TYPE_TO_ROW[type] ?? 0;

  const startCoord = api.coord([start, rowIndex]);
  const endCoord = api.coord([end, rowIndex]);
  const sizeRaw = api.size?.([0, 1]) ?? [0, 0];
  const size = Array.isArray(sizeRaw) ? sizeRaw : [sizeRaw, sizeRaw];
  const barHeight = size[1] * 0.6;
  return {
    type: 'rect',
    shape: {
      x: startCoord[0],
      y: startCoord[1] - barHeight / 2,
      width: endCoord[0] - startCoord[0],
      height: barHeight,
    },
    style: {
      fill: color,
    },
    info: {
      type,
      start,
      end,
      raw: api.value(0),
    },
  };
}
