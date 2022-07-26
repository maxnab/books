const express = require('express');
const router = express.Router();
const fileMulter = require("../middleware/file");
const { shelf, Book, keys } = require("../data");

router.get('/', (request, response, next) => {
  const { books } = shelf;

  response.render('books/index', {
    books: books
  })
})

router.get('/all', (request, response) => {
  const { books } = shelf;

  response.json(books);
})

router.get('/:id/book', (request, response) => {
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

router.get('/:id/view', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;

  const idx = books.findIndex(el => el.id === id);

  const book = books[idx];

  if (idx !== -1) {
    response.render('books/view', {
      book: book
    })
  }
})

router.get('/create', (request, response) => {
  response.render('books/create', {
    book: new Book(),
    keys: keys,
  });
})

router.post('/create', fileMulter.single('book-file'), (request, response) => {
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
  response.redirect('/api/books')
  response.json(newBook);
})

router.get('/:id/update', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;

  const idx = books.findIndex(el => el.id === id);

  response.render('books/update', {
    book: books[idx],
    keys: keys,
  })
})

router.post('/:id/update', fileMulter.single('book-file'), (request, response) => {
  const { books } = shelf;
  const { title = '', authors = '', description = '', favorite = '', fileCover = '', fileName = '' } = request.body;
  const { id } = request.params;

  console.log('id', id);
  console.log('put', request.body);

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

    response.redirect('/api/books');
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