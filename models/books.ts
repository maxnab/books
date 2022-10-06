import mongoose from 'mongoose';

interface Book extends mongoose.Document{
  title: string;
  description: string;
  authors: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
}

const booksSchema = new mongoose.Schema<Book>({
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
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  }
});

class BooksRepository {
  createBook(book: Book){}
  getBook(id: string){}
  getBooks(){}
  updateBook(id: string){}
  deleteBook(id: string){}
}

export default mongoose.model<Book>('Books', booksSchema)