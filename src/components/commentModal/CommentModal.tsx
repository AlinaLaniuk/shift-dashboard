import { Input, Modal } from 'antd';
import { useRef } from 'react';
import type { EventDataTuple } from '@chartsTypes/chartTypes';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { formatTimeHHMM } from '@utils/helpers/timeHelpers';
const { TextArea } = Input;

type CommentModalProps = {
  isOpen: boolean;
  handleSubmitComment: (eventId: string, comment: string) => Promise<void>;
  currentEvent: EventDataTuple | null;
  closeCommentModal: () => void;
};

export function CommentModal({
  isOpen,
  handleSubmitComment,
  currentEvent,
  closeCommentModal,
}: CommentModalProps) {
  const ref = useRef<TextAreaRef>(null);
  if (!currentEvent) return null;
  const [, label, start, end, , , id] = currentEvent;

  const onOk = () => {
    const value = ref.current?.resizableTextArea?.textArea?.value ?? '';
    handleSubmitComment(id, value);
  };

  return (
    <Modal
      title={`Добавить комментарий к событию ${label} ${formatTimeHHMM(start)} - ${formatTimeHHMM(end)}`}
      cancelText="Закрыть"
      okText="Отправить"
      open={isOpen}
      onCancel={closeCommentModal}
      onOk={onOk}
    >
      <TextArea ref={ref} />
    </Modal>
  );
}
