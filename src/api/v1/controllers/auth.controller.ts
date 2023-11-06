import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/user.interface';
import asyncHandler from '../middleware/async.middleware';
import AuthService from '../services/auth.service';
import sendEmail from '../utils/sendEmails/sendEmails';
import UserService from '../services/user.service';
import HttpException from '../utils/exceptions/http.exception';

interface options {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}

class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  private JWT_COOKIE_EXPIRE: string = process.env.JWT_COOKIE_EXPIRE || '1d';

  // Get token from model, create cookie and send response
  private sendTokenResponse = (
    user: User,
    statusCode: number,
    res: Response
  ) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options: options = {
      expires: new Date(
        Date.now() + parseInt(this.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    const expires = new Date(
      Date.now() + parseInt(this.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    );

    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
    });
  };
  ///

  public register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { firstName, lastName, email, password } = req.body;

      // Create a new user object
      const newUser: Partial<User> = {
        firstName,
        lastName,
        email,
        password,
      };

      // Register the user
      const registeredUser = await this.authService.register(newUser);
      const confirmEmailToken = registeredUser.generateEmailConfirmToken();

      // Create reset url
      const confirmEmailURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/auth/confirmemail?token=${confirmEmailToken}`;

      const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

      registeredUser.save({ validateBeforeSave: false });

      const sendResult = await sendEmail(
        registeredUser.email,
        'Email confirmation token',
        message
      );
      console.log(sendResult, 'DEBUG');

      this.sendTokenResponse(registeredUser, 201, res);
    }
  );

  public login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { email, password } = req.body;

      // Perform user login
      const user = await this.userService.getUserWithPassword(email);

      if (!user) {
        return next(
          new HttpException(404, `User with email :- ${email} does not exists.`)
        );
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return next(new HttpException(401, `Invalid credentials`));
      }

      // Return success response with authentication token
      this.sendTokenResponse(user, 200, res);
    }
  );

  public getAuthenticatedUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req.user || null;
      if (!user) {
        return next(new HttpException(401, `User not authenticated`));
      }

      // Return success response with authenticated user
      res.status(200).json({
        success: true,
        message: 'Authenticated user retrieved successfully',
        user,
      });
    }
  );

  public logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.cookie('token', 'expired', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        data: {},
      });
    }
  );

  public updatePassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let { currentPassword, newPassword } = req.body;

      let userId = req.user._id;
      let user = await this.userService.getUserByIdWithPassword(userId);

      if (!user) {
        return next(
          new HttpException(404, `User with ID :- ${userId} does not exists.`)
        );
      }

      const isMatch = await user.matchPassword(currentPassword);

      if (!isMatch) {
        return next(new HttpException(401, `Current Password is incorrect`));
      }

      user.password = newPassword;

      const updatedUser = await this.userService.updatePassword(
        userId,
        newPassword
      );

      // Return success response
      res.status(200).json({
        success: true,
        message: 'User password updated successfully',
        updatedUser,
      });
    }
  );
}
export default AuthController;
