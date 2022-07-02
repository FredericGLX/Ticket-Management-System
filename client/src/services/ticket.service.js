import http from '../helper/http-common';

const getAll = (page, limit) => {
  return http.get(`/projects/tickets?page=${page}&limit=${limit}`);
};
const get = (id) => {
  return http.get(`/projects/tickets/${id}`);
};
const create = (id, data) => {
  return http.post(`/projects/${id}/ticket`, data);
};
const update = (id, data) => {
  return http.put(`projects/tickets/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/projects//tickets/${id}`);
};
const removeAllFromProject = (id) => {
  return http.delete(`/projects/${id}/tickets`);
};
const findByTitle = (title) => {
  return http.get(`/projects/tickets?title=${title}`);
};
const TicketService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAllFromProject,
  findByTitle,
};
export default TicketService;
