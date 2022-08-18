const express = require('express');
const router = express.Router();
const fileMulter = require("../middleware/file");
const Books = require('../../models/books');
const { getCheckboxValue } = require("../data");

router.get('/', async (request, response) => {
  try {
    const books = await Books.find().select('-__v')
    response.render('books/index', {
      books: books,
    })
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/all', async (request, response) => {
  try {
    const books = await Books.find().select('-__v')
    response.json(books);
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/:id/book', async (request, response) => {
  const { id } = request.params;

  try {
    const book = await Books.findById(id).select('-__v');
    if (book) {
      response.json(book);
    } else {
      response.status(404)
      response.json({ message: 'Book not found', code: 404 })
    }
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/:id/view', async (request, response) => {
  const { id } = request.params;
  try {
    const book = await Books.findById(id).select('-__v');
    response.render('books/view', {
      book: book,
    })
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/create', (request, response) => {
  response.render('books/create', {
    book: new Books(),
  });
})

router.post('/create', fileMulter.single('book-file'), async (request, response) => {
  const { title = '', description = '', authors = '', favorite = 'false' } = request.body;

  let fileBook = '';
  let fileName = '';
  let fileCover = '';

  if (request.file) {
    fileBook = request.file.path;
    fileName = request.file.filename;
  }

  const newBook = new Books({
    title,
    description,
    authors,
    favorite: getCheckboxValue(favorite),
    fileCover,
    fileName,
    fileBook
  });

  try {
    await newBook.save()
    response.status(201);
    response.json({ status: 201, message: 'Created successfully '})
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/:id/update', async (request, response) => {
  const { id } = request.params;
  try {
    const book = await Books.findById(id).select('-__v');
    response.render('books/update', {
      book: book,
    })
  } catch (e) {
    response.status(500).json(e)
  }
})

router.post('/:id/update', fileMulter.single('book-file'), async (request, response) => {
  const { id } = request.params;
  const { title = '', authors = '', description = '', favorite = 'false', fileCover = '', fileName = '' } = request.body;

  try {
    await Books.findByIdAndUpdate(id, {
      title,
      authors,
      description,
      favorite: getCheckboxValue(favorite),
      fileCover,
      fileName
    });

    response.json({status: '200', message: 'Updated successfully' });
  } catch (e) {
    response.status(500).json(e)
  }
})

router.delete('/:id', async (request, response) => {
  const {id} = request.params;

  try {
    await Books.deleteOne({ _id: id })
    response.status(201).json({message: 'Book deleted successfully', code: 201})
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/:id/download', async (request, response) => {
  const {id} = request.params;

  try {
    const book = await Books.findById(id).select('-__v');
    const file = book.fileBook;
    const fileName = book.fileName;

    response.download(file, fileName, (err) => {
      if (err) {
        response.status(404);
        response.render('errors/404');
      }
    });
  } catch (e) {
    response.status(500).json(e)
  }
})

module.exports = router;