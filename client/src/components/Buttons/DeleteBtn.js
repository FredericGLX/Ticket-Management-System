import '../../scss/components/buttons.scss';
import { useState } from 'react';
import DeleteModal from '../Modals/Delete/DeleteModal';
import useClickOutside from '../../hooks/useClickOutside';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteBtn = ({ project, ticketId, type, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div>
      {icon ? (
        <IoMdClose onClick={() => setIsOpen(true)} />
      ) : (
        <div className="close-text-ticket" onClick={() => setIsOpen(true)}>
          <span>Delete </span> <AiOutlineDelete size={'1.6rem'} />
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
    </div>
  );
};

export default DeleteBtn;
