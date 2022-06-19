const express = require('express');
const db = require('./src/models');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});
// Routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/ticket.routes')(app);
require('./src/routes/project.routes')(app);
// require('./src/routes/createTicket.routes')(app);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

// Set port, listen for requests
const port = process.env.PORT || 8000;
app.listen(port);

// Database
db.mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

////
////
////
// Set up user type
var Role = db.role;
const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: 'manager',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'manager' to roles collection");
      });
      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
};
