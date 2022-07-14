import { Link } from 'react-router-dom';
import { GiClick } from 'react-icons/gi';

const AssignedItems = ({ items, type }) => {
  return (
    <>
      {type === 'project' &&
        items.map((item) => (
          <div key={item._id}>
            <Link to={`/projects/${item._id}/details`}>
              <span className="item-title">{item.title}</span>
            </Link>
          </div>
        ))}
      {type === 'ticket' &&
        items.map((item) => (
          <div key={item._id}>
            <Link to={`/projects/${item.project}/${item._id}`}>
              <span className="item-title">{item.title}</span>
            </Link>
          </div>
        ))}
    </>
  );
};

export default AssignedItems;
