import { Link } from 'react-router-dom';

const AssignedItems = ({ items, type }) => {
  return (
    <>
      {type === 'project' &&
        items.map((item) => (
          <div key={item._id}>
            {item.title}
            <Link to={`/projects/${item._id}/details`}>Details</Link>
          </div>
        ))}
      {type === 'ticket' &&
        items.map((item) => (
          <div key={item._id}>
            {item.title}
            <Link to={`/projects/${item.project}/${item._id}`}>Details</Link>
          </div>
        ))}
    </>
  );
};

export default AssignedItems;
