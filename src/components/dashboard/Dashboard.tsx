import ReactECharts from 'echarts-for-react';
import { getOption } from './chartConfiguration/getOption';
import type { DashboardData, EventDataTuple } from '@chartsTypes/chartTypes';

type DashboardProps = {
  dashboardData: DashboardData;
  openCommentModal: () => void;
  setCurrentEvent: (currentEvent: EventDataTuple) => void;
};

const Dashboard = ({ openCommentModal, dashboardData, setCurrentEvent }: DashboardProps) => {
  const option = getOption(dashboardData);

  const onEvents = {
    click: (params: { seriesName: string; data: EventDataTuple }) => {
      if (params.seriesName === 'events') {
        const event: EventDataTuple = params.data;
        setCurrentEvent(event);
        openCommentModal();
      }
    },
  };

  return (
    <ReactECharts option={option} style={{ height: 600, width: '100%' }} onEvents={onEvents} />
  );
};

export default Dashboard;
