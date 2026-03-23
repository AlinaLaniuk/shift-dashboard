import { useEffect, useState } from 'react';

export function useCommentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    
  })

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openModal,
    closeModal,
    comment,
    setComment,
  };
}
