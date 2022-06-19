// import authHeader from './auth.header';
import http from '../helper/http-common';

const getAll = () => {
  return http.get('/test/all');
};

const get = (id) => {
  return http.get(`/test/${id}`);
};

// const getPublicContent = () => {
//   return axios.get(API_URL + 'all');
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + 'user', { headers: authHeader() });
// };

// const getManagerBoard = () => {
//   return axios.get(API_URL + 'mod', { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + 'admin', { headers: authHeader() });
// };

const UserService = {
  getAll,
  get,
  // getUserBoard,
  // getManagerBoard,
  // getAdminBoard,
};
export default UserService;
