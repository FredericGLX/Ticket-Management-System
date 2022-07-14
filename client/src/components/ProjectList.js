import '../scss/general.scss';
import '../scss/components/items.scss';
import '../scss/components/pagination.scss';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  return (
    <div className="items-container">
      {projects.length > 0
        ? projects.map((project) => {
            return (
              <div className="item-container" key={project._id}>
                <span className="item-date">
                  {formatDate(project.createdAt)}
                </span>
                <span className="item-title">{project.title}</span>
                <Link to={`/projects/${project._id}`} key={project._id}>
                  <span className="item-see-tickets">See tickets</span>
                </Link>
                <Link
                  to={`/projects/${project._id}/details`}
                  className="item-details"
                >
                  Details
                </Link>
                <a>
                  <DeleteBtn project={project} type={'project'} icon={true} />
                </a>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default ProjectList;
