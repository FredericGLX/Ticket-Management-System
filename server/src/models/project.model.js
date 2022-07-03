const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = (mongoose, mongoosePaginate) => {
  const schema = mongoose.Schema(
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
  );

  schema.plugin(mongoosePaginate);
  const Project = mongoose.model('Project', schema);
  return Project;
};
