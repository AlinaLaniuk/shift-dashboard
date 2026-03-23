import type { Products } from '@chartsTypes/chartTypes';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import type {
  CustomSeriesOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from 'echarts';
import { format } from 'echarts';

export function createProductsSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'products',
    type: 'custom',
    xAxisIndex: 0,
    yAxisIndex: 0,
    renderItem: renderProductsItem,
    data: data,
    tooltip: {
      formatter: (params: { data: Products }) => {
        const { value } = params.data;
        const start = value[0];
        const end = value[1];
        const productName = value[2];

        const tooltipContent = `${format.encodeHTML(`${formatTimeHHMM(start)} - ${formatTimeHHMM(end)}`)}<br/><b>${format.encodeHTML(productName)}</b>`;
        return tooltipContent;
      },
    },
  };
}

function renderProductsItem(_params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
  const categoryIndex = 0;
  const start = api.coord([api.value(0), categoryIndex]);
  const end = api.coord([api.value(1), categoryIndex]);
  const size = api.size?.([0, 1]);
  if (!size || typeof size === 'number') return;

  const height = size[1];

  return {
    type: 'rect',
    shape: {
      x: start[0],
      y: 0,
      width: end[0] - start[0],
      height: height,
    },
    style: {
      fill: api.visual('color'),
    },
  };
}
