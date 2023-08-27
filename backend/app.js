const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');

dotenv.config();

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const transactionRoute = require('./routes/transaction');

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL);
  } catch (err) {
    throw new Error(err);
  }
};
const app = express();
const store = new MongoDBStore({
  uri: process.env.URL,
  collection: 'sessions',
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: { secure: true },
  })
);

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/transactions', transactionRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connect port:', process.env.PORT);
});
