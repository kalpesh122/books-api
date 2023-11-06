import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Route from '../utils/interfaces/route.interface';
import authenticatedMiddleware from '../middleware/authenticated.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import validate from '../validations/auth.validation';
import trimRequestBody from '../middleware/trimRequestBody.middleware';
class AuthRoute implements Route {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      '/register',
      validationMiddleware(validate.register),
      trimRequestBody,
      this.authController.register
    );
    this.router.post(
      '/login',
      validationMiddleware(validate.login),
      trimRequestBody,
      this.authController.login
    );
    this.router.get(
      '/me',
      authenticatedMiddleware,
      this.authController.getAuthenticatedUser
    );
    this.router.post('/logout', this.authController.logout);
    this.router.patch(
      '/updatepassword',
      authenticatedMiddleware,
      validationMiddleware(validate.updatePassword),
      trimRequestBody,
      this.authController.updatePassword
    );
  }

  public getRouter(): typeof AuthRoute {
    return AuthRoute;
  }
}
export default AuthRoute;
