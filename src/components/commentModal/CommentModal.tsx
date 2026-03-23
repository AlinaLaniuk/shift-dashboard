import { Input, Modal } from 'antd';
import { useRef } from 'react';
import type { TextAreaRef } from 'antd/es/input/TextArea';
const { TextArea } = Input;

type CommentModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  setComment: (comment: string) => void;
};

export function CommentModal({ isOpen, closeModal, setComment }: CommentModalProps) {
  const ref = useRef<TextAreaRef>(null);

  const onOk = () => {
    const value = ref.current?.resizableTextArea?.textArea?.value ?? '';
    setComment(value);
  };
  return (
    <Modal
      title="Добавить комментарий к событию"
      cancelText="Закрыть"
      okText="Отправить"
      open={isOpen}
      onCancel={closeModal}
      onOk={onOk}
    >
      <TextArea ref={ref} />
    </Modal>
  );
}
