import asyncHandler from '../middleware/async.middleware';
import BookService from '../services/book.service';
import { Request,Response,NextFunction } from 'express';

class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  public getAllBooks =  asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const books  = await this.bookService.getBooks();
    res.status(200).json({
      success: true,
      message: 'All Books fetched  successfully',
      books,
    });

  })
  public getBookById = asyncHandler(async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    let bookId:string  = req.query.bookId && req.query.bookId.toString() || '';
    const book = await this.bookService.getBookById(bookId);
    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      book,
    });
  }) 
  public createBook(): void {}
  public updateBook(): void {}
  public deleteBook(): void {}
}

export default BookController;
