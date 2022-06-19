import '../scss/variables.scss';
import AddProjectBtn from './Buttons/AddProjectBtn';
import PageLayout from './PageLayout';

const Homepage = () => {
  return (
    <PageLayout addButton={<AddProjectBtn />}>
      <h1>Welcome to the page</h1>
    </PageLayout>
  );
};

export default Homepage;
