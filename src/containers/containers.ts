import {Container} from "inversify";
import {Book} from "../../models/books";

class BooksRepository {
  createBook(book: Book){}
  getBook(id: string){}
  getBooks(){}
  updateBook(id: string){}
  deleteBook(id: string){}
}

const container = new Container();
container.bind(BooksRepository).toSelf();

export { container, BooksRepository };
