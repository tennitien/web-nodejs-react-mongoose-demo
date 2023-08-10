const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');

dotenv.config();
const port = process.env.PORT || 5000;
const url = process.env.URL;

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
// const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connect MongoDB');
  } catch (err) {
    throw new Error(err);
  }
};

// middlewares:
// app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Hello');
  next();
});
// app.use('/api/auth', authRoute);
// app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
// app.use('/api/rooms', roomsRoute);

app.listen(port, () => {
  connect();
});
