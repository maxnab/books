import mongoose from 'mongoose';

interface Book extends mongoose.Document{
  title: string;
  description: string;
  authors: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
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
  },
  fileBook: {
    type: String,
  }
});

export type { Book }
export default mongoose.model<Book>('Books', booksSchema)