import '../../../scss/general.scss';
import '../../../scss/components/deletemodal.scss';
import ReactDOM from 'react-dom';
import TicketService from '../../../services/ticket.service';
import ProjectService from '../../../services/project.service';
import { removeItemOnce } from '../../../helper/helper';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({
  open,
  onClose,
  domNodeRef,
  project,
  ticketId,
  type,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleDelete = () => {
    if (type === 'ticket') {
      // Remove the ticket from the database
      TicketService.remove(ticketId);
      // Remove the ticket id from Project.tickets[]
      const removedTicket = removeItemOnce(project.tickets, ticketId);
      project.tickets = removedTicket;
      ProjectService.update(project._id, project).then(() => {
        window.location.reload();
      });
    }
    if (type === 'project') {
      ProjectService.remove(project._id);
      TicketService.removeAllFromProject(project._id).then(() => {
        window.location.reload();
      });
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="delete-modal-container" ref={domNodeRef}>
        <p>Are you sure you want to delete this?</p>
        <div className="delete-modal-btns">
          <button className="delete-btn btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="cancel-btn btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default DeleteModal;
