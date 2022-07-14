import '../../scss/components/addmodal.scss';
import '../../scss/general.scss';
import ReactDOM from 'react-dom';

import { IoIosCloseCircleOutline } from 'react-icons/io';

const AddModal = ({ open, onClose, children, domNodeRef }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container" ref={domNodeRef}>
        <IoIosCloseCircleOutline
          className="modal-close-icon"
          size="2.6rem"
          color="#fff"
          title="close modal"
          style={{ stroke: '#000', strokeWidth: '4', zIndex: '1' }}
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default AddModal;
