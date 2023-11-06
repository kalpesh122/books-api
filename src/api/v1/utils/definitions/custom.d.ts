import User from '../../interfaces/book.interface';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
