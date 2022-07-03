const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
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
  );

  schema.plugin(mongoosePaginate);
  const Ticket = mongoose.model('Ticket', schema);
  return Ticket;
};
