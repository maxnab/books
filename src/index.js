const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

console.log(process.env)

async function init(port, dbUrl) {
  try {
    await mongoose.connect(dbUrl);
    app.listen(port, () => {
      console.log('Server started')
    })
  } catch (e) {
    console.error(e)
  }
}

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

init(PORT, DB_URL);