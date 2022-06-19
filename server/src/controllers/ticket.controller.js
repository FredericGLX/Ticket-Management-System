const db = require('../models');
const Ticket = db.tickets;
const Project = db.projects;

// Create and Save a new Ticket
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const id = req.params.id;
  // Create a Ticket
  const ticket = new Ticket({
    title: req.body.title,
    description: req.body.description,
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    project: id,
    status: req.body.status.value,
    assigned: req.body.assigned.map((e) => e.value),
  });
  // Save Ticket in the database
  ticket.save();
  const projectRelated = await Project.findById(id);
  console.log('related', projectRelated);
  projectRelated.tickets.push(ticket);
  await projectRelated.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};
  Ticket.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Ticket with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Ticket.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Ticket with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Ticket with id=' + id });
    });
};

// Delete ticket and remove it from Project.tickets[]
exports.delete = (req, res) => {
  const id = req.params.id;
  Ticket.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`,
        });
      } else {
        res.send({
          message: 'Ticket was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Ticket with id=' + id,
      });
    });
};

// Delete all Tickets from the database.
exports.deleteAllFromProject = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  Ticket.deleteMany({ project: { $eq: id } })
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tickets were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Tickets.',
      });
    });
};

// Update a Ticket by the id in the request
exports.update = (req, res) => {
  console.log('req.body', req.body);
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }
  const id = req.params.id;
  Ticket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found!`,
        });
      } else res.send({ message: 'Ticket was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Ticket with id=' + id,
      });
    });
};
