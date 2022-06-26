import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import { useEffect, useState } from 'react';
import ProjectService from '../services/project.service';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { Link } from 'react-router-dom';
import AddProjectBtn from './Buttons/AddProjectBtn';
import PageLayout from './PageLayout';
import { sortByDateAscending, sortByDateDescending } from '../helper/helper';
import { BiSortAlt2 } from 'react-icons/bi';

const Projects = () => {
  const order = !localStorage.getItem('projectSortOrder')
    ? localStorage.setItem('projectSortOrder', false)
    : localStorage.getItem('projectSortOrder');
  const [clicked, setClicked] = useState(order);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    ProjectService.getAll().then((res) => {
      const data = res.data;
      if (order === 'true') sortByDateAscending(data);
      setProjects(data);
    });
  }, []);

  const handleSortBy = () => {
    if (order === 'false') {
      localStorage.setItem('projectSortOrder', true);
      sortByDateAscending(projects);
      setClicked(true);
      setProjects(projects);
    } else {
      localStorage.setItem('projectSortOrder', false);
      sortByDateDescending(projects);
      setClicked(false);
      setProjects(projects);
    }
  };

  return (
    <PageLayout addButton={<AddProjectBtn />}>
      <div className="tickets-container">
        <h1>Here are the projects:</h1>
        Sort <BiSortAlt2 className="icon-sort" onClick={handleSortBy} />
        {projects.length > 0
          ? projects.map((project) => {
              return (
                <div className="ticket-container" key={project._id}>
                  <span>{formatDate(project.createdAt)}</span>
                  <span>{project.title}</span>
                  <Link to={`/projects/${project._id}`} key={project._id}>
                    <span>See tickets</span>
                  </Link>
                  <Link to={`/projects/${project._id}/details`}>Details</Link>
                  <DeleteBtn project={project} type={'project'} icon={true} />
                </div>
              );
            })
          : ''}
      </div>
    </PageLayout>
  );
};

export default Projects;
