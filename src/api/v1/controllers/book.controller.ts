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
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const books = await this.bookService.getBooks();
  
      return res.status(200).json({
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
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';
      const book = await this.bookService.getBookById(bookId);
      if (!book){
        return res.status(200).json({
          success:false,
          message: `Book does not exists for bookId :- ${bookId}`
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Book fetched successfully',
        book,
      });
    }
  );
  public createBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      let bookData: IBook = req.body;
      const book = await this.bookService.createBook(bookData);
      return res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book,
      });
    }
  );
  public updateBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      let bookData: IBook = req.body;
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';
      
      const bookExists = await this.bookService.getBookById(bookId);
      
      if (!bookExists){
        return res.status(200).json({
          success:false,
          message: `Book does not exists for bookId :- ${bookId}`
        })
      };


      const book = await this.bookService.updateBook(bookData, bookId);
      return res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        book,
      });
    }
  );
  public deleteBook = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      let bookId: string =
        (req.params.bookId && req.params.bookId.toString()) || '';

        const bookExists = await this.bookService.getBookById(bookId);
      
        if (!bookExists){
          return res.status(200).json({
            success:false,
            message: `Book does not exists for bookId :- ${bookId}`
          })
        };
      const book = await this.bookService.deleteBook(bookId);
      return res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
      });
    }
  );
}

export default BookController;
