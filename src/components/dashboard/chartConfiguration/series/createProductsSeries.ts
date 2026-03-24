import type { Products } from '@chartsTypes/chartTypes';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
import type {
  CustomSeriesOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from 'echarts';
import { format, graphic } from 'echarts';

export function createProductsSeries(data: CustomSeriesOption['data']) {
  return {
    name: 'products',
    type: 'custom',
    xAxisIndex: 0,
    yAxisIndex: 0,
    renderItem: renderProductsItem,
    data: data,
    encode: {
      x: [0, 1],
      y: 2,
    },
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

type CartesianCoordSys = {
  type: 'cartesian2d';
  x: number;
  y: number;
  width: number;
  height: number;
};

function renderProductsItem(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
  const categoryIndex = 0;
  const coordSys = params.coordSys as CartesianCoordSys;

  const startVal = api.value(0);
  const endVal = api.value(1);

  const start = api.coord([startVal, categoryIndex]);
  const end = api.coord([endVal, categoryIndex]);

  const rectShape = {
    x: start[0],
    y: coordSys.y,
    width: end[0] - start[0],
    height: coordSys.height,
  };

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
    style: api.style({
      fill: api.visual('color'),
    }),
  };
}
