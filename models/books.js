const { Schema, model } = require('mongoose');

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
    // required: true,
  },
  fileCover: {
    type: String,
    // required: true,
  },
  fileName: {
    type: String,
    // required: true,
  }
});

module.exports = model('Books', booksSchema)