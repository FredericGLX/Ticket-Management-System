import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Project from './components/Project';
import Projects from './components/Projects';
import ItemDetails from './components/ItemDetails';
import PageNotFound from './components/PageNotFound';
import ProtectedRoutes from './helper/ProtectedRoutes';
import { Routes, Route } from 'react-router-dom';
import AuthService from './services/auth.service';

const App = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <Routes>
        <Route path="/" element={!currentUser ? <Login /> : <Homepage />} />
        <Route path="login" element={!currentUser ? <Login /> : <Homepage />} />
        <Route
          path="signup"
          element={!currentUser ? <Register /> : <Homepage />}
        />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="home" element={<Homepage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<Project />} />
          <Route
            path="projects/:projectId/details"
            element={<ItemDetails type={'project'} />}
          />
          <Route
            path="projects/:projectId/:ticketId"
            element={<ItemDetails type={'ticket'} />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
