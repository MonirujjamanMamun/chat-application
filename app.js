const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const loginRouter = require('./router/loginRouter');
const userRouter = require('./router/userRouter');
const inboxRouter = require('./router/inboxRouter');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('database connection successful!'))
  .catch((err) => console.log(err));
// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set('view engine', 'ejs');

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));
// routes
app.use('/', loginRouter);
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.all('*', (req, res) => {
  res.send('API is running');
});
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
