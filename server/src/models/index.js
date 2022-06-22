const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.tickets = require('./ticket.model.js')(mongoose);
db.projects = require('./project.model')(mongoose);
module.exports = db;
