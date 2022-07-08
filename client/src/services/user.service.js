import http from '../helper/http-common';

const getAll = () => {
  return http.get('/test/all');
};

const get = (id) => {
  return http.get(`/test/${id}`);
};

const UserService = {
  getAll,
  get,
};
export default UserService;
