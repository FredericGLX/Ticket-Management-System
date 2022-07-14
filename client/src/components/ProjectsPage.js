import '../scss/general.scss';
import '../scss/components/items.scss';
import '../scss/components/pagination.scss';
import { useEffect, useState } from 'react';
import ProjectService from '../services/project.service';
import AddItemBtn from './Buttons/AddItemBtn';
import Pagination from './Pagination';
import PageLayout from './PageLayout';
import { sortByDateAscending, sortByDateDescending } from '../helper/helper';
import { BiSortAlt2 } from 'react-icons/bi';
import SearchBar from './SearchBar';
import ProjectList from './ProjectList';
import AddProjectForm from './Modals/AddProject/AddProjectForm';

const ProjectsPage = () => {
  const order = !localStorage.getItem('projectSortOrder')
    ? localStorage.setItem('projectSortOrder', false)
    : localStorage.getItem('projectSortOrder');
  const [clicked, setClicked] = useState(order);
  const [projects, setProjects] = useState([]);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 6;
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) {
      ProjectService.getAll(currentPage, size).then((res) => {
        setResultsNumber(res.data.totalItems);
        setTotalPages(res.data.totalPages);
        const data = res.data.projects;
        if (order === 'true') sortByDateAscending(data);
        setProjects(data);
      });
    } else {
      ProjectService.findByTitle(query).then((res) => {
        const results = res.data.projects;
        setProjects(results);
      });
    }
  }, [currentPage, query]);

  const handleSortBy = () => {
    if (order === 'false') {
      localStorage.setItem('projectSortOrder', true);
      sortByDateAscending(projects);
      setClicked(true);
    } else {
      localStorage.setItem('projectSortOrder', false);
      sortByDateDescending(projects);
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
    <PageLayout
      addButton={<AddItemBtn title={'Add Project'} form={<AddProjectForm />} />}
    >
      <div className="page-content">
        <div className="content-header">
          <h1>Created projects:</h1>
          <div className="right-content">
            <SearchBar handleChange={handleChange} />
            <div className="sort-option">
              <BiSortAlt2
                className="icon-sort"
                onClick={handleSortBy}
                size={'2rem'}
              />
            </div>
          </div>
        </div>
        <ProjectList projects={projects} />
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
    </PageLayout>
  );
};

export default ProjectsPage;
