const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.tickets = require('./ticket.model.js')(mongoose, mongoosePaginate);
db.projects = require('./project.model')(mongoose, mongoosePaginate);
module.exports = db;
