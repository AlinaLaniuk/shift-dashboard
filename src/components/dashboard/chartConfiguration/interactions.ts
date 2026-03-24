import { EVENTS_MAP } from '@constants/eventMap';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';

interface AxisPointerLabelFormatterParams {
  axisDimension: 'x' | 'y';
  axisIndex: number;
  value: number;
}

export const axisPointer = {
  link: [{ xAxisIndex: 'all' }],
};

export const tooltip = {
  trigger: 'item',
  axisPointer: {
    type: 'cross',
    snap: true,
    label: {
      formatter: (params: AxisPointerLabelFormatterParams) => {
        const value = params.value;

        if (params.axisDimension === 'x') {
          return formatTimeHHMM(value);
        }

        if (params.axisDimension === 'y') {
          if (params.axisIndex === 0) {
            return 'Продукт';
          }

          if (params.axisIndex === 1 || params.axisIndex === 2) {
            return Math.floor(value);
          }

          if (params.axisIndex === 3) {
            return EVENTS_MAP[value]?.label;
          }
        }

        return params.value;
      },
    },
  },
};
