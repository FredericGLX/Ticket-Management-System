const db = require('../models');
const Project = db.projects;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  // Create a Project
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    assigned: req.body.assigned.map((e) => e.value),
    status: req.body.status.value,
  });
  // Save project in the database
  project
    .save(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      });
    });
};

// Retrieve all projects from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Project.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        projects: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving projects.',
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Project with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Project with id=' + id });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  const id = req.params.id;
  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`,
        });
      } else res.send({ message: 'Project was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Project with id=' + id,
      });
    });
};
// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Project.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`,
        });
      } else {
        res.send({
          message: 'Project was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Project with id=' + id,
      });
    });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Projects were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Projects.',
      });
    });
};
