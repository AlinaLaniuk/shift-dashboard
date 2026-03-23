import ReactECharts from 'echarts-for-react';
import { getOption } from './chartConfiguration/getOption';
import { useDataForCharts } from './useShiftDashboard';

const ShiftDashboard = () => {
  const dashboardData = useDataForCharts();

  const option = getOption(dashboardData);

  // const onEvents = {
  //   click: (params) => {
  //     if (params.seriesName === 'events') {
  //       const id = params.data[6];
  //       console.log(id);
  //       setOpen(true);
  //     }
  //   },
  // };

  return (
    <>
      <ReactECharts option={option} style={{ height: 1000, width: '100%' }} />
    </>
  );
};

export default ShiftDashboard;
