import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import { useEffect, useState } from 'react';
import TicketService from '../services/ticket.service';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sortByDateAscending } from '../helper/helper';
import Pagination from './Pagination';

const Tickets = ({ project, order }) => {
  const [tickets, setTickets] = useState([]);
  const { projectId } = useParams();
  const [resultsNumber, setResultsNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 10;

  useEffect(() => {
    TicketService.getAll(currentPage, size).then((res) => {
      setResultsNumber(res.data.totalItems);
      setTotalPages(res.data.totalPages);
      const data = res.data.tickets;
      console.log(data);
      if (order === 'true') sortByDateAscending(data);
      setTickets(data);
    });
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

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
      {resultsNumber > size ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Tickets;
