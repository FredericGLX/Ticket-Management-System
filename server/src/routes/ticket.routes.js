const pagination = require('../middlewares/pagination');
const tickets = require('../controllers/ticket.controller');
const db = require('../models');
const Ticket = db.tickets;

module.exports = (app) => {
  var router = require('express').Router();
  // Create a new ticket
  router.post('/:id/ticket', tickets.create);
  // Retrieve all tickets
  router.get('/tickets', pagination.paginatedResults(Ticket), tickets.findAll);
  // Retrieve a single ticket with id
  router.get('/tickets/:id', tickets.findOne);
  // Update a ticket with id
  router.put('/tickets/:id', tickets.update);
  // Delete a ticket with id
  router.delete('/tickets/:id', tickets.delete);
  // Create a new ticket
  router.delete('/:id/tickets/', tickets.deleteAllFromProject);
  app.use('/api/projects', router);
};
