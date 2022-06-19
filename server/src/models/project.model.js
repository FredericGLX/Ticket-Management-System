const mongoose = require('mongoose');

module.exports = (mongoose) => {
  const Project = mongoose.model(
    'Project',
    mongoose.Schema(
      {
        title: String,
        description: String,
        tickets: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
          },
        ],
        status: String,
        assigned: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
      { timestamps: true }
    )
  );
  return Project;
};
