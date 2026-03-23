import { CommentModal } from '@components/commentModal/CommentModal';
import Dashboard from '@components/dashboard/Dashboard';
import { useCommentModal } from '../../components/commentModal/useCommentModal';

export function ShiftDashboard() {
  const { openModal, isOpen, closeModal, setComment } = useCommentModal();

  return (
    <>
      <Dashboard openCommentModal={openModal} />
      <CommentModal isOpen={isOpen} closeModal={closeModal} setComment={setComment}/>
    </>
  );
}
