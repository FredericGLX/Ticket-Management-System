import '../../scss/components/buttons.scss';
import { useState } from 'react';
import DeleteModal from '../Modals/Delete/DeleteModal';
import useClickOutside from '../../hooks/useClickOutside';
import { IoMdClose } from 'react-icons/io';

const DeleteBtn = ({ project, ticketId, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div className="delete-btn">
      <IoMdClose
        className="close-icon-ticket"
        onClick={() => setIsOpen(true)}
      />
      <DeleteModal
        open={isOpen}
        onClose={onClose}
        domNodeRef={domNode}
        project={project}
        ticketId={ticketId}
        type={type}
      />
    </div>
  );
};

export default DeleteBtn;
