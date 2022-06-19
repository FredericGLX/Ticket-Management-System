import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoutes = () => {
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
