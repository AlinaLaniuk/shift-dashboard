import { CommentModal } from '@components/commentModal/CommentModal';
import Dashboard from '@components/dashboard/Dashboard';
import { useCommentModal } from '@components/commentModal/useCommentModal';
import { useDashboard } from '@components/dashboard/useDashboard';
import { Flex, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

export function ShiftDashboard() {
  const { dashboardData, currentEvent, setCurrentEvent, fetchDashboardData } = useDashboard();
  const { openCommentModal, isOpen, closeCommentModal, handleSubmitComment } =
    useCommentModal(fetchDashboardData);

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', fontSize: 20 }}>
        Рабочая смена {dashboardData.date}
      </Header>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <Flex justify='center' style={{ width: '90%' }}>
          <Dashboard
            openCommentModal={openCommentModal}
            dashboardData={dashboardData}
            setCurrentEvent={setCurrentEvent}
          />
        </Flex>
        <CommentModal
          isOpen={isOpen}
          handleSubmitComment={handleSubmitComment}
          currentEvent={currentEvent}
          closeCommentModal={closeCommentModal}
        />
      </Content>
    </Layout>
  );
}
