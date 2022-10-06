import { Schema, model } from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
  },
});

usersSchema.plugin(passportLocalMongoose);

module.exports = model('Users', usersSchema)