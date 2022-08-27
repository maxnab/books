const { Schema, model } = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

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