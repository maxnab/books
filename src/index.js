const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const Users = require("../models/users");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { verifyPassword } = require("./db/localDb");
const {options} = require("./data");
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const verify = async (username, password, done) => {
  try {
    const user = await Users.find({ username }).select('-__v')

    if(verifyPassword(user, password)) {
      return done(null, false)
    }
    if (!user) {
      return done(null, false)
    }
    return done(null, user)

  }
  catch (e) {
    return done(e)
  }
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((userArray, done) => {
  const [ user ] = userArray;
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findOne({ id }, (err, user) => {
    done(err, user);
  });
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'SECRET'}));
app.use(passport.initialize())
app.use(passport.session())

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

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