import '../scss/components/sidebar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = ({ addButton }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleActive = () => {
    if (active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const hamburgerIcon = (
    <span onClick={() => handleActive()}>
      <GiHamburgerMenu className={'hamburger-icon'} size={'1.6rem'} />
    </span>
  );

  return active ? (
    <div className={`navbar-container-${active ? 'active' : 'inactive'}`}>
      <nav>
        {hamburgerIcon}
        <>
          <li>{addButton}</li>
        </>
        {currentUser ? (
          <>
            <li className="side-links">
              <Link to={'/projects'}>Projects</Link>
            </li>

            <li className="side-links">
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
  ) : (
    <div className="side-icon-inactive">{hamburgerIcon}</div>
  );
};

export default Navbar;
