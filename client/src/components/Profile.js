import AuthService from '../services/auth.service';
import PageLayout from './PageLayout';

const Profile = () => {
  let currentUser = AuthService.getCurrentUser();

  return (
    <PageLayout>
      <h1>Profile</h1>
      <h3>{currentUser.email}</h3>
    </PageLayout>
  );
};

export default Profile;
