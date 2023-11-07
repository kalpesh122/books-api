import IBook from '../interfaces/book.interface';
import BookModel from '../models/schema/book.model';

class UserService {
  private book = BookModel;

  /**
   * @Create a new Book
   */
  public async createBook(body: IBook): Promise<IBook> {
    try {
      const book = await this.book.create(body);
      return book;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   *
   * @Update a Book
   */
  public async updateBook(body: IBook, bookId: string): Promise<IBook> {
    try {
      const updatedUser = await this.book.updateOne(
        { bookId, deletedAt: null },
        body
      );
      return body;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * @finding a single Book By Id
   */
  public async getBookById(bookId: string): Promise<IBook | null> {
    try {
      const user = await this.book.findOne({ bookId, deletedAt: null });
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * @finding a AllBooks
   */
  public async getBooks(): Promise<IBook[] | null> {
    try {
      const user = await this.book.find({ deletedAt: null });
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   *
   * @Delete a Book
   */
  public async deleteBook(bookId: string): Promise<any | null> {
    try {
      const deleteBook = await this.book.deleteOne({ bookId, deletedAt: null });
      return deleteBook;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
export default UserService;
