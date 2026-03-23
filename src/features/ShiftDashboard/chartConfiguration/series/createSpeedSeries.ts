import type { LineSpeed, SpeedMarkAreaData } from '@chartsTypes/chartTypes';
import { themeColors } from '@constants/colors';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import { format, type CustomSeriesOption } from 'echarts';

export function createSpeedSeries(
  data: CustomSeriesOption['data'],
  speedMarkAreaData: SpeedMarkAreaData,
) {
  return {
    name: 'lineSpeed',
    type: 'line',
    xAxisIndex: 2,
    yAxisIndex: 2,
    smooth: true,
    data: data,
    symbol: 'circle',
    markArea: {
      itemStyle: {
        color: themeColors.backgroundDanger,
        opacity: 0.3,
      },
      data: speedMarkAreaData,
    },
    tooltip: {
      formatter: (params: { value: LineSpeed }) => {
        const [time, speed] = params.value;

        const tooltipContent = `${format.encodeHTML(`${formatTimeHHMM(time)}`)}<br/><b>Скорость: ${format.encodeHTML(String(speed))} шт/час.</b>`;
        return tooltipContent;
      },
    },
  };
}
