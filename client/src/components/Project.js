import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Tickets from './Tickets';
import AddTicketBtn from './Buttons/AddTicketBtn';
import { useEffect, useState } from 'react';
import ProjectService from '../services/project.service';
import { useParams } from 'react-router-dom';
import { BiSortAlt2 } from 'react-icons/bi';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const order = !localStorage.getItem('ticketSortOrder')
    ? localStorage.setItem('ticketSortOrder', false)
    : localStorage.getItem('ticketSortOrder');
  const [clicked, setClicked] = useState(order);
  const { projectId } = useParams();

  useEffect(() => {
    ProjectService.get(projectId).then((response) => {
      setProjects(response.data);
    });
  }, []);

  const handleSortBy = () => {
    if (order === 'false') {
      localStorage.setItem('ticketSortOrder', true);
      setClicked(true);
    } else {
      localStorage.setItem('ticketSortOrder', false);
      setClicked(false);
    }
  };

  return (
    <div>
      <Topbar />
      <Sidebar addButton={<AddTicketBtn />} />
      <div className="content-area">
        <h1>Here are the tickets</h1>
        Sort <BiSortAlt2 className="icon-sort" onClick={handleSortBy} />
        <Tickets project={projects} order={order} />
      </div>
    </div>
  );
};

export default Project;
