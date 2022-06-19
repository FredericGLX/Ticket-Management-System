import '../../scss/components/buttons.scss';
import { useState } from 'react';
import AddModal from '../Modals/AddModal';
import AddTicketForm from '../Modals/Ticket/AddTicketForm';
import useClickOutside from '../../hooks/useClickOutside';

const AddTicketBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      <button className="btn-add-issue" onClick={() => setIsOpen(true)}>
        Add Ticket
      </button>
      <AddModal open={isOpen} onClose={onClose} domNodeRef={domNode}>
        <AddTicketForm />
      </AddModal>
    </>
  );
};

export default AddTicketBtn;
