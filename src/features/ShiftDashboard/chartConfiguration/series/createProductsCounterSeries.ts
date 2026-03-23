import type { ProductsCounter } from '@chartsTypes/chartTypes';
import { themeColors } from '@constants/colors';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import { format, type CustomSeriesOption } from 'echarts';

export function createProductsCounterSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'productsCounter',
    type: 'line',
    xAxisIndex: 1,
    yAxisIndex: 1,
    smooth: true,
    lineStyle: { color: themeColors.primaryLine },
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: {
      color: themeColors.primaryLine,
    },
    data: data,
    tooltip: {
      formatter: (params: { value: ProductsCounter }) => {
        const [time, count] = params.value;

        const tooltipContent = `${format.encodeHTML(`${formatTimeHHMM(time)}`)}<br/><b>Произведено ${format.encodeHTML(String(count))} шт.</b>`;
        return tooltipContent;
      },
    },
  };
}
