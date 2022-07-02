import http from '../helper/http-common';

const getAll = (page, limit) => {
  return http.get(`/projects?page=${page}&limit=${limit}`);
};
const get = (id) => {
  return http.get(`/projects/${id}`);
};
const create = (data) => {
  return http.post('/projects', data);
};
const update = (id, data) => {
  return http.put(`/projects/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/projects/${id}`);
};
const removeAll = () => {
  return http.delete(`/projects`);
};
const findByTitle = (title) => {
  return http.get(`/projects?title=${title}`);
};
const ProjectService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default ProjectService;
