// All the things we need for our server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const {testURI} = require('./test/testURI');

// Where we are going to store environment variables
require('dotenv').config();

// How we are going to create our express server
const app = express();
// Port our server will be on.
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connecting our URI to our DB,
const uri =
  process.env.NODE_ENV === 'test' ? testURI : process.env.ATLAS_URI_DEV;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const {connection} = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully'); // eslint-disable-line no-console
});

// serve static resources from server in production
app.use(express.static(path.join(__dirname, '../web-application/build')));
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'web-application', 'build', 'index.html'),
  );
});

const testRouter = require('./routes/user');

app.use('/user', testRouter);

const budgetRouter = require('./routes/budget');

app.use('/budget', budgetRouter);

const hotelRouter = require('./routes/hotel');

app.use('/hotel', hotelRouter);

const todolistRouter = require('./routes/todolist');

app.use('/todolist', todolistRouter);

const flightRouter = require('./routes/flight');

app.use('/flight', flightRouter);

const ticketRouter = require('./routes/ticket');

app.use('/ticket', ticketRouter);

// This starts listening for the port for the server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`); // eslint-disable-line no-console
});
module.exports = server;
