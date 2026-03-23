import type { SpeedSetpoint } from '@chartsTypes/chartTypes';
import { themeColors } from '@constants/colors';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import { format, type CustomSeriesOption } from 'echarts';

export function createSpeedSetpointSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'speedSetpoints',
    type: 'line',
    step: 'end',
    xAxisIndex: 2,
    yAxisIndex: 2,
    data: data,
    lineStyle: {
      type: 'dashed',
      color: themeColors.primaryLine,
    },
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: {
      color: themeColors.primaryLine,
    },
    tooltip: {
      formatter: (params: { data: SpeedSetpoint }) => {
        const { value, interval } = params.data;
        const start = interval[0];
        const end = interval[1];
        const speed = value[1];

        return `${format.encodeHTML(`${formatTimeHHMM(start)} - ${formatTimeHHMM(end)}`)}<br/><b>Уставка: ${format.encodeHTML(String(speed))}</b>`;
      },
    },
  };
}
