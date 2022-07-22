const express = require('express');
const router = express.Router();
const { v4: uuid } = require("uuid");
const fileMulter = require("../middleware/file");
const path = require("path");
const fs = require("fs");

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
    this.authors = '';
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileBook = fileBook;
    this.fileName = fileName;
    this.id = id;
  }
}

const shelf = {
  books: [
    new Book(),
    new Book(),
  ],
};

router.get('/', (request, response) => {
  const { books } = shelf;
  response.json(books);
})

router.get('/:id', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;
  const idx = books.findIndex(el => el.id === id)

  if( idx !== -1) {
    response.json(books[idx])
  } else {
    response.status(404)
    response.json({ message: 'Book not found', code: 404 })
  }
})

router.post('/', fileMulter.single('book-file'), (request, response) => {
  const { books } = shelf;
  const { title, description, authors, favorite } = request.body;

  let fileBook = '';
  let fileName = '';
  let fileCover = '';
  if (request.file) {
    fileBook = request.file.path;
    fileName = request.file.filename;
  }

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);
  response.status(201);
  response.json(newBook);
})

router.put('/:id', (request, response) => {
  const { books } = shelf;
  const { title = '', authors = '', description = '', favorite = '', fileCover = '', fileName = '' } = request.body;
  const { id } = request.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1){
    books[idx] = {
      ...books[idx],
      title,
      authors,
      description,
      favorite,
      fileCover,
      fileName,
    }

    response.json(books[idx]);
  } else {
    response.status(404);
    response.json({ message: 'Book not updated', code: 404 });
  }
})

router.delete('/:id', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;
  const idx = books.findIndex(el => el.id === id);

  if(idx !== -1){
    books.splice(idx, 1)
    response.json({ message: 'Book deleted successfully', code: 201 })
  } else {
    response.status(404)
    response.json({ message: 'Book not deleted', code: 404 })
  }
})

router.get('/:id/download', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;
  const idx = books.findIndex(el => el.id === id);

  if( idx !== -1) {
    const file = books[idx].fileBook;
    const fileName = books[idx].fileName;

    response.download(file, fileName, (err) => {
      if (err) {
        response.status(404);
        response.json({ message: 'File download error', code: 404 })
      }
    });
  } else {
    response.status(404)
    response.json({ message: 'Book not found', code: 404 })
  }
})

module.exports = router;