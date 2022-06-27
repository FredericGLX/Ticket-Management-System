const projects = require('../controllers/project.controller');
const pagination = require('../middlewares/pagination');
const db = require('../models');
const Project = db.projects;

module.exports = (app) => {
  var router = require('express').Router();
  // Create a new project
  router.post('/', projects.create);
  // Retrieve all project
  router.get('/', pagination.paginatedResults(Project), projects.findAll);
  // Retrieve a single project with id
  router.get('/:id', projects.findOne);
  // Update a project with id
  router.put('/:id', projects.update);
  // Delete a project with id
  router.delete('/:id', projects.delete);
  // Create a new project
  router.delete('/', projects.deleteAll);
  app.use('/api/projects', router);
};
