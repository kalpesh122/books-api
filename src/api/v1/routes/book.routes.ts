import express, { Router } from 'express';
import BookController from '../controllers/book.controller';
import Route from '../utils/interfaces/route.interface';
import trimRequestBody from '../middleware/trimRequestBody.middleware';
import {createBook, updateBook} from '../validations/book.validation';
import validationMiddleware from '../middleware/validation.middleware';

class BookRoute implements Route {
  public router: Router;
  private bookController: BookController;

  constructor() {
    this.router = express.Router();
    this.bookController = new BookController();
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get('/books', this.bookController.getAllBooks);
    this.router.get('/books/:bookId', this.bookController.getBookById);
    this.router.post('/books', trimRequestBody,validationMiddleware(createBook) ,this.bookController.createBook);
    this.router.patch(
      '/books/:bookId',
      trimRequestBody,
      validationMiddleware(updateBook),
      this.bookController.updateBook
    );
    this.router.delete('/books/:bookId', this.bookController.deleteBook);
  }

  public getRouter(): typeof BookRoute {
    return BookRoute;
  }
}
export default BookRoute;
