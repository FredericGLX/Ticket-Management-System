import '../../scss/components/buttons.scss';
import { useState } from 'react';
import AddModal from '../Modals/AddModal';
import useClickOutside from '../../hooks/useClickOutside';

const AddItemBtn = ({ title, form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      <button className="btn-add-item" onClick={() => setIsOpen(true)}>
        {title}
      </button>
      <AddModal open={isOpen} onClose={onClose} domNodeRef={domNode}>
        {form}
      </AddModal>
    </>
  );
};

export default AddItemBtn;
