// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Set up routes
const index = require('./routes/index');
const users = require('./routes/users');
app.use('/', index);
app.use('/users', users);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
