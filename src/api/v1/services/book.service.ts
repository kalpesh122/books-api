import IBook from '../interfaces/book.interface';
import BookModel from '../models/schema/book.model';

class UserService {
  private book = BookModel;

  /**
   * @Create a new Book
   */
  public async createBook(body: IBook): Promise<IBook> {
    try {
      const book = await this.book.create({ body });
      return book;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   *
   * @Update a Book 
   */
  public async updateBook(body: IBook): Promise<IBook> {
    try {
      const updatedUser = await this.book.updateOne({ _id: body._id }, body);
      if (!updatedUser) {
        throw new Error('Property not found or not modified');
      }
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
      const user = await this.book.find({ deletedAt:null });
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }



    /**
   *
   * @Delete a Book 
   */
    public async deleteBook(body: IBook): Promise<IBook> {
      try {
        const updatedUser = await this.book.deleteOne({ _id: body._id });
        if (!updatedUser) {
          throw new Error('Property not found or not modified');
        }
        return body;
      } catch (error) {
        throw new Error('Something went wrong');
      }
    }
  

}
export default UserService;
