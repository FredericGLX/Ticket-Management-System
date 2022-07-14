import '../../scss/components/addItemMainBtn.scss';
import { useState } from 'react';
import AddModal from '../Modals/AddModal';
import useClickOutside from '../../hooks/useClickOutside';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const AddItemMainBtn = ({ title, form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      <div className="main-add-btn-container" onClick={() => setIsOpen(true)}>
        <AiOutlinePlusCircle
          className="plus-sign-icon"
          size={'15px'}
          color={'#0a2351'}
        />{' '}
        {title}
      </div>
      <AddModal open={isOpen} onClose={onClose} domNodeRef={domNode}>
        {form}
      </AddModal>
    </>
  );
};

export default AddItemMainBtn;
