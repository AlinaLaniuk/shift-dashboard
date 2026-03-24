import { shiftApi } from '@api/shiftApi';
import { useState } from 'react';

export function useCommentModal(fetchDashboardData: () => Promise<void>) {
  const [isOpen, setIsOpen] = useState(false);

  function openCommentModal() {
    setIsOpen(true);
  }

  function closeCommentModal() {
    setIsOpen(false);
  }

  const handleSubmitComment = async (eventId: string, comment: string) => {
    try {
      await shiftApi.updateComment({ id: eventId, comment: comment });
      await fetchDashboardData();
      closeCommentModal();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isOpen,
    openCommentModal,
    closeCommentModal,
    handleSubmitComment,
  };
}
