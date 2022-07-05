import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TicketList from './TicketList';
import TicketService from '../services/ticket.service';
import AddTicketBtn from './Buttons/AddTicketBtn';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import ProjectService from '../services/project.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiSortAlt2 } from 'react-icons/bi';
import { sortByDateAscending, sortByDateDescending } from '../helper/helper';

const TicketsPage = () => {
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const order = !localStorage.getItem('ticketSortOrder')
    ? localStorage.setItem('ticketSortOrder', false)
    : localStorage.getItem('ticketSortOrder');
  const [clicked, setClicked] = useState(order);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const { projectId } = useParams();
  const size = 10;

  useEffect(() => {
    ProjectService.get(projectId).then((response) => {
      setProjects(response.data);
    });
  }, []);

  useEffect(() => {
    if (!query) {
      TicketService.getAll(currentPage, size).then((res) => {
        setResultsNumber(res.data.totalItems);
        setTotalPages(res.data.totalPages);
        const data = res.data.tickets;
        if (order === 'true') sortByDateAscending(data);
        setTickets(data);
      });
    } else {
      TicketService.findByTitle(query).then((res) => {
        const results = res.data.tickets;
        setTickets(results);
      });
    }
  }, [currentPage, query]);

  const handleSortBy = () => {
    if (order === 'false') {
      localStorage.setItem('ticketSortOrder', true);
      sortByDateAscending(tickets);
      setClicked(true);
    } else {
      localStorage.setItem('ticketSortOrder', false);
      sortByDateDescending(tickets);
      setClicked(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Topbar />
      <Sidebar addButton={<AddTicketBtn />} />
      <div className="content-area">
        <h1>Here are the tickets</h1>
        <SearchBar handleChange={handleChange} />
        Sort <BiSortAlt2 className="icon-sort" onClick={handleSortBy} />
        <TicketList project={projects} order={order} tickets={tickets} />
      </div>
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

export default TicketsPage;
