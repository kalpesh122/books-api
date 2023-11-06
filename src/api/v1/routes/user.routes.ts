import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import Route from '../utils/interfaces/route.interface';
class UserRoute implements Route {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get('/', this.userController.getAllUsers);
    this.router.get('/:id', this.userController.getUser);
    this.router.post('/', this.userController.createUser);
    this.router.patch('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  }

  public getRouter(): typeof UserRoute {
    return UserRoute;
  }
}
