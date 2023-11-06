import express, { Router } from 'express';
import BookController from '../controllers/book.controller';
import Route from '../utils/interfaces/route.interface';


class BookRoute implements Route {
  public router: Router;
  private bookController: BookController;

  constructor() {
    this.router = express.Router();
    this.bookController = new BookController();
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get('/', this.bookController.getAllBooks);
    // this.router.get('/:id', this.userController.getUser);
    // this.router.post('/', this.userController.createUser);
    // this.router.patch('/:id', this.userController.updateUser);
    // this.router.delete('/:id', this.userController.deleteUser);
  }

  public getRouter(): typeof BookRoute {
    return BookRoute;
  }
}
export default BookRoute;