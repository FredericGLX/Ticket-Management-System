import '../scss/general.scss';
import '../scss/components/items.scss';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TicketList = ({ tickets, project }) => {
  const { projectId } = useParams();

  return (
    <div className="items-container">
      {tickets.length > 0
        ? tickets.map((ticket) => {
            if (ticket.project === projectId)
              return (
                <div className="item-container" key={ticket._id}>
                  <span className="item-date">
                    {formatDate(ticket.createdAt)}
                  </span>
                  <span className="item-title">{ticket.title}</span>
                  <span className="item-details">{ticket.authorName}</span>
                  <>
                    <Link
                      to={`/projects/${projectId}/${ticket._id}`}
                      className="item-details"
                    >
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
        : 'Cannot find tickets'}
    </div>
  );
};

export default TicketList;
