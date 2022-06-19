import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Tickets from './Tickets';
import AddTicketBtn from './Buttons/AddTicketBtn';
import { useEffect, useState } from 'react';
import ProjectService from '../services/project.service';
import { useParams } from 'react-router-dom';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    ProjectService.get(projectId).then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      <Topbar />
      <Sidebar addButton={<AddTicketBtn />} />
      <div className="content-area">
        <h1>Here are the tickets</h1>
        <Tickets project={projects} />
      </div>
    </div>
  );
};

export default Project;
