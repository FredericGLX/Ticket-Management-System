import AuthService from '../services/auth.service';
import PageLayout from './PageLayout';
import { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import TicketService from '../services/ticket.service';
import AssignedItems from './AssignedItems';

const AssignedToMe = () => {
  let currentUser = AuthService.getCurrentUser();
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [projectList, setProjectList] = useState(false);
  const [ticketList, setTicketList] = useState(false);

  useEffect(() => {
    ProjectService.getAll().then((res) => {
      const assignedProjects = res.data.filter((project) =>
        project.assigned.includes(currentUser.id)
      );
      setProjects(assignedProjects);
    });
    TicketService.getAll().then((res) => {
      console.log(res.data);
      const assignedTickets = res.data.filter((ticket) =>
        ticket.assigned.includes(currentUser.id)
      );
      setTickets(assignedTickets);
    });
  }, []);

  console.log(projects, tickets);

  const toggle = (type) => {
    if (type === 'project' && projectList === false) {
      setProjectList(true);
    } else {
      setProjectList(false);
    }
    if (type === 'ticket' && ticketList === false) {
      setTicketList(true);
    } else {
      setTicketList(false);
    }
  };

  return (
    <PageLayout>
      <h1>Assigned to me</h1>
      <p>You currently have {projects.length} projects assigned to you.</p>
      {projects.length > 0 && (
        <p onClick={() => toggle('project')}>See assigned projects</p>
      )}
      <div className="items-container">
        {projectList && <AssignedItems items={projects} type={'project'} />}
      </div>
      <p>You currently have {tickets.length} tickets assigned to you.</p>
      {tickets.length > 0 && (
        <p onClick={() => toggle('ticket')}>See assigned tickets</p>
      )}
      <div className="items-container">
        {ticketList && <AssignedItems items={tickets} type={'ticket'} />}
      </div>
    </PageLayout>
  );
};

export default AssignedToMe;
