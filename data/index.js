const { v4: uuid } = require("uuid");

class Book {
  constructor(title = '',
              description = '',
              authors = '',
              favorite = '',
              fileCover = '',
              fileName = '',
              fileBook = '',
              id = uuid()) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileBook = fileBook;
    this.fileName = fileName;
    this.id = id;
  }
}

const shelf = {
  books: [
    new Book('War and Peace'),
    new Book('Game of Thrones'),
  ],
};

const keys = {
  title: 'Название',
  description: 'Описание',
  authors: 'Авторы',
  id: 'Артикул',
}

module.exports = { shelf, Book, keys };