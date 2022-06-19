const db = require('../models');
const User = db.user;

exports.getAll = (req, res) => {
  // Retrieve all users from the database.
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

exports.get = (req, res) => {
  // Retrieve specific users from the database.
  const id = req.params.id;
  User.findById(id)
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

  // User.find()
  //   .where('_id')
  //   .in(id)
  //   .then((data) => {
  //     if (!data)
  //       res.status(404).send({ message: 'Cannot find user with id ' + id });
  //     else res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || 'Some error occurred while retrieving the user.',
  //     });
  //   });
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};
exports.managerBoard = (req, res) => {
  res.status(200).send('Manager Content.');
};
