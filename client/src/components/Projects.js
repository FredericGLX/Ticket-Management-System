import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import '../scss/components/pagination.scss';
import { useEffect, useState } from 'react';
import ProjectService from '../services/project.service';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { Link, useParams } from 'react-router-dom';
import AddProjectBtn from './Buttons/AddProjectBtn';
import Pagination from './Pagination';
import PageLayout from './PageLayout';
import { sortByDateAscending, sortByDateDescending } from '../helper/helper';
import { BiSortAlt2 } from 'react-icons/bi';

const Projects = () => {
  const order = !localStorage.getItem('projectSortOrder')
    ? localStorage.setItem('projectSortOrder', false)
    : localStorage.getItem('projectSortOrder');
  const [clicked, setClicked] = useState(order);
  const [projects, setProjects] = useState([]);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const pageList = Math.ceil(resultsNumber / limit);

  useEffect(() => {
    ProjectService.getAll(currentPage, limit).then((res) => {
      setResultsNumber(res.data.resultsNumber);
      const data = res.data.results;
      if (order === 'true') sortByDateAscending(data);
      setProjects(data);
    });
  }, [currentPage]);

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

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
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
        {resultsNumber > limit ? (
          <Pagination
            currentPage={currentPage}
            pageList={pageList}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        ) : (
          ''
        )}
      </div>
    </PageLayout>
  );
};

export default Projects;
