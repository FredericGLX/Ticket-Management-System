import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TicketList = ({ tickets, project }) => {
  const { projectId } = useParams();

  return (
    <div className="tickets-container">
      {tickets.length > 0
        ? tickets.map((ticket) => {
            if (ticket.project === projectId)
              return (
                <div className="ticket-container" key={ticket._id}>
                  <span>{formatDate(ticket.createdAt)}</span>
                  <span>{ticket.title}</span>
                  <span>{ticket.authorName}</span>
                  <>
                    <Link to={`/projects/${projectId}/${ticket._id}`}>
                      Details
                    </Link>
                    <DeleteBtn
                      project={project}
                      ticketId={ticket._id}
                      type={'ticket'}
                      icon={true}
                    />
                  </>
                </div>
              );
          })
        : ''}
    </div>
  );
};

export default TicketList;
