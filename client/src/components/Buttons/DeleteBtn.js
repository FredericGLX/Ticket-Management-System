import '../../scss/components/buttons.scss';
import { useState } from 'react';
import DeleteModal from '../Modals/Delete/DeleteModal';
import useClickOutside from '../../hooks/useClickOutside';
import { IoMdClose } from 'react-icons/io';

const DeleteBtn = ({ project, ticketId, type, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      {icon ? (
        <IoMdClose
          className="close-icon-ticket"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <div className="close-text-ticket" onClick={() => setIsOpen(true)}>
          Delete
        </div>
      )}
      <DeleteModal
        open={isOpen}
        onClose={onClose}
        domNodeRef={domNode}
        project={project}
        ticketId={ticketId}
        type={type}
      />
    </>
  );
};

export default DeleteBtn;
