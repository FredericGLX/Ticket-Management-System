import AuthService from '../services/auth.service';
import PageLayout from './PageLayout';
import '../scss/components/profile.scss';

const Profile = () => {
  let currentUser = AuthService.getCurrentUser();

  console.log(currentUser);

  return (
    <PageLayout>
      <div className="profile-container">
        <h1>User Profile</h1>
        <p>
          <span>Email:</span> {currentUser.email}
        </p>
        <p>
          <span>Name:</span> {currentUser.firstName} {currentUser.lastName}
        </p>
      </div>
    </PageLayout>
  );
};

export default Profile;
