const mongoose = require('mongoose');

module.exports = (mongoose) => {
  const Ticket = mongoose.model(
    'Ticket',
    mongoose.Schema(
      {
        title: String,
        description: String,
        authorName: String,
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
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
  return Ticket;
};
