const db = require('../models');
const Ticket = db.tickets;
// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  // Create a Ticket
  const ticket = new Ticket({
    title: req.body.title,
    description: req.body.description,
    authorId: req.body.authorId,
    authorName: req.body.authorName,
  });
  // Save Ticket in the database
  ticket
    .save()
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

// Update a Ticket by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
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
// Delete a Ticket with the specified id in the request
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
exports.deleteAll = (req, res) => {
  Ticket.deleteMany({})
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
