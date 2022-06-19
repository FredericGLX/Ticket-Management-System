import '../../scss/components/buttons.scss';
import { useState } from 'react';
import AddModal from '../Modals/AddModal';
import AddProjectForm from '../Modals/AddProject/AddProjectForm';
import useClickOutside from '../../hooks/useClickOutside';

const AddProjectBtn = () => {
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
        Add Project
      </button>
      <AddModal open={isOpen} onClose={onClose} domNodeRef={domNode}>
        <AddProjectForm />
      </AddModal>
    </>
  );
};

export default AddProjectBtn;
