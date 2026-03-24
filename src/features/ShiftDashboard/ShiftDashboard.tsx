import { CommentModal } from '@components/commentModal/CommentModal';
import Dashboard from '@components/dashboard/Dashboard';
import { useCommentModal } from '@components/commentModal/useCommentModal';
import { useDashboard } from '@components/dashboard/useDashboard';

export function ShiftDashboard() {
  const { dashboardData, currentEvent, setCurrentEvent, fetchDashboardData } = useDashboard();
  const { openCommentModal, isOpen, closeCommentModal, handleSubmitComment } = useCommentModal(fetchDashboardData);

  return (
    <>
      <Dashboard
        openCommentModal={openCommentModal}
        dashboardData={dashboardData}
        setCurrentEvent={setCurrentEvent}
      />
      <CommentModal
        isOpen={isOpen}
        handleSubmitComment={handleSubmitComment}
        currentEvent={currentEvent}
        closeCommentModal={closeCommentModal}
      />
    </>
  );
}
