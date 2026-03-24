import type { DashboardData } from '@chartsTypes/chartTypes';
import { tooltip, axisPointer } from './interactions';
import { getVisualMap, grids, createXAxis, yAxis, dataZoom } from './layout';
import { createEventsSeries } from './series/createEventsSeries';
import { createProductsCounterSeries } from './series/createProductsCounterSeries';
import { createProductsSeries } from './series/createProductsSeries';
import { createSpeedSeries } from './series/createSpeedSeries';
import { createSpeedSetpointSeries } from './series/createSpeedSetpointSeries';

export function getOption({
  start,
  end,
  products,
  productsCounter,
  lineSpeed,
  speedSetpoint,
  events,
  speedVisualMapData,
  speedMarkAreaData,
}: DashboardData) {
  return {
    tooltip: tooltip,
    axisPointer: axisPointer,
    visualMap: getVisualMap(speedVisualMapData),
    grid: grids,
    xAxis: createXAxis(start, end),
    yAxis: yAxis,
    dataZoom: dataZoom,
    series: [
      createProductsSeries(products),
      createProductsCounterSeries(productsCounter),
      createSpeedSeries(lineSpeed, speedMarkAreaData),
      createSpeedSetpointSeries(speedSetpoint),
      createEventsSeries(events),
    ],
  };
}
