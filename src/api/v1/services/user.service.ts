import User from '../interfaces/user.interface';
import userModel from '../models/schema/user.model';

class UserService {
  private user = userModel;

  /**
   * @Create a new user
   */
  public async createUser(body: User): Promise<User> {
    try {
      const user = await this.user.create({ body });
      return user;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  /**
   *
   * @Update a  user
   */
  public async updateUser(body: User): Promise<User> {
    try {
      const updatedUser = await this.user.updateOne({ _id: body._id }, body);
      if (!updatedUser) {
        throw new Error('Property not found or not modified');
      }
      return body;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * @finding a single User By Id
   */
  public async getUser(email: string): Promise<User | null> {
    try {
      const user = await this.user.findOne({ email, deletedAt: null });
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  public async getUserWithPassword(email: string): Promise<User | null> {
    try {
      const user = await this.user
        .findOne({ email, deletedAt: null })
        .select('+password');
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  public async getUserByIdWithPassword(userId: string): Promise<User | null> {
    try {
      const user = await this.user
        .findOne({ _id: userId, deletedAt: null })
        .select('+password');
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  public async updatePassword(
    userId: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await this.user.findOneAndUpdate(
        { _id: userId, deletedAt: null },
        { password }
      );
      return user;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
export default UserService;
