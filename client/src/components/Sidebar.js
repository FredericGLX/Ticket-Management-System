import '../scss/components/sidebar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

const Navbar = ({ addButton }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="navbar-container">
      <nav>
        <div>
          <li>{addButton}</li>
        </div>

        {currentUser ? (
          <>
            <li>
              <Link to={'/projects'}>Projects</Link>
            </li>

            <li>
              <Link to={'/assigned'}>Assigned to me</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/register'}>Sign up</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
