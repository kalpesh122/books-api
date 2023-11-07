import IBook from '../interfaces/book.interface';
import asyncHandler from '../middleware/async.middleware';
import BookService from '../services/book.service';
import { Request, Response, NextFunction } from 'express';

class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  public getAllBooks = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const books = await this.bookService.getBooks();
      res.status(200).json({
        success: true,
        message: books?.length
          ? 'All Books fetched  successfully'
          : 'No books found',
        count: books?.length,
        books,
      });
    }
  );
  public getBookById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';
      const book = await this.bookService.getBookById(bookId);
      res.status(200).json({
        success: true,
        message: 'Book fetched successfully',
        book,
      });
    }
  );
  public createBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let bookData: IBook = req.body;
      const book = await this.bookService.createBook(bookData);
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book,
      });
    }
  );
  public updateBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let bookData: IBook = req.body;
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';

      const book = await this.bookService.updateBook(bookData, bookId);
      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        book,
      });
    }
  );
  public deleteBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';
      const book = await this.bookService.deleteBook(bookId);
      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        book,
      });
    }
  );
}

export default BookController;
