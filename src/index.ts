import path from 'path';
import express from 'express';
import passport from 'passport';
import mongoose, {CallbackError} from 'mongoose';
import session from 'express-session';
import {Strategy as LocalStrategy, VerifyFunctionWithRequest} from 'passport-local';
import userRouter from './routes/user';
import booksRouter from './routes/books';
import Users, {User} from "../models/users";
import { verifyPassword } from "./db/localDb";
import { options } from "./data";

// TODO
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const verify: VerifyFunctionWithRequest = async (req, username, password, done) => {
  try {
    const [ user ] = await Users.find({ username }).select('-__v');

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

passport.serializeUser<string>((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser((id, done) => {
  Users.findOne({ id }, (err: CallbackError, user: User) => {
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

async function init(port: string | number, dbUrl: string) {
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

void init(PORT, DB_URL);