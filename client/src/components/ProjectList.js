import '../scss/variables.scss';
import '../scss/components/tickets.scss';
import '../scss/components/pagination.scss';
import { useEffect, useState } from 'react';
import { formatDate } from '../helper/helper';
import DeleteBtn from './Buttons/DeleteBtn';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  return (
    <div className="tickets-container">
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
  );
};

export default ProjectList;
