import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import { useEffect, useState } from 'react';
import TicketService from '../services/ticket.service';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';

const Tickets = ({ project }) => {
  const [tickets, setTickets] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    TicketService.getAll().then((response) => {
      setTickets(response.data);
    });
  }, []);

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
                    />
                  </>
                </div>
              );
          })
        : ''}
    </div>
  );
};

export default Tickets;
