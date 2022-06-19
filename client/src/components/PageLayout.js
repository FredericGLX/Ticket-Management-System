import '../scss/variables.scss';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Tickets from './Tickets';
import Projects from './Projects';
import AddProjectBtn from './Buttons/AddProjectBtn';

const PageLayout = ({ children, addButton }) => {
  return (
    <div>
      <Topbar />
      <Sidebar addButton={addButton} />
      <div className="content-area">{children}</div>
    </div>
  );
};

export default PageLayout;
