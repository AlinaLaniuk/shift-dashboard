import ReactECharts from 'echarts-for-react';
import { useDashboard } from './useDashboard';
import { getOption } from './chartConfiguration/getOption';

type DashboardProps = {
  openCommentModal: () => void;
};

const Dashboard = ({ openCommentModal }: DashboardProps) => {
  const dashboardData = useDashboard();

  const option = getOption(dashboardData);

  const onEvents = {
    click: (params) => {
      if (params.seriesName === 'events') {
        const id = params.data[6];
        openCommentModal();
      }
    },
  };

  return (
      <ReactECharts option={option} style={{ height: 1000, width: '100%' }} onEvents={onEvents} />
  );
};

export default Dashboard;
