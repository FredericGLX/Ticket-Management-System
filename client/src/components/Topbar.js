import '../scss/components/topbar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout().then(() => {
      window.location.reload();
    });
  };

  return (
    <header className="topbar-container">
      <div className="topbar-left">
        <Link to={'/'}>LOGO</Link>
      </div>
      <div className="topbar-middle">
        <li>
          <Link to={'/home'}>Home</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link to={'/profile'}>Profile</Link>
            </li>

            <li>
              <Link to={'/login'} onClick={logOut}>
                Logout
              </Link>
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
      </div>
    </header>
  );
};

export default Navbar;
