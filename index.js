const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
  constructor(title = '',
              description = '',
              authors = '',
              favorite = '',
              fileCover = '',
              fileName = '',
              id = uuid()) {
    this.title = title;
    this.description = description;
    this.authors = '';
    this.favorite = favorite;
    this.fileCover = fileCover;
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

const app = express();
app.use(express.json());

app.post('/api/user/login', (request, response) => {
  const user = { id: 1, mail: "test@mail.ru" };
  response.json(user);
})

app.get('/api/books', (request, response) => {
  const { books } = shelf;
  response.json(books);
})

app.get('/api/books/:id', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;
  const idx = books.findIndex(el => el.id === id)

  if( idx !== -1) {
    response.json(books[idx])
  } else {
    response.status(404)
    response.json('Code: 404')
  }
})

app.post('/api/books', (request, response) => {
  const { books } = shelf;
  const { title, description, favorite, fileCover, fileName } = request.body;

  const newBook = new Book(title, description, favorite, fileCover, fileName);
  books.push(newBook);
  response.status(201);
  response.json(newBook);
})

app.put('/api/books/:id', (request, response) => {
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
    response.json('Code: 404');
  }
})

app.delete('/api/books/:id', (request, response) => {
  const { books } = shelf;
  const { id } = request.params;
  const idx = books.findIndex(el => el.id === id);

  if(idx !== -1){
    books.splice(idx, 1)
    response.json('ok')
  } else {
    response.status(404)
    response.json('Code: 404')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)