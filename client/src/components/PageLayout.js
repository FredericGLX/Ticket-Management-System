import '../scss/general.scss';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PageLayout = ({ children, addButton }) => {
  return (
    <div>
      <Topbar />
      <div className="content-area">
        <Sidebar addButton={addButton} />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
