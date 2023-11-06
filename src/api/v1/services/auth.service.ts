import User from '../interfaces/user.interface';
import userModel from '../models/schema/user.model';

class AuthService {
  private user = userModel;
  constructor() {}

  public async register(userData: Partial<User>): Promise<User> {
    try {
      const user = await this.user.create(userData);

      return user;
    } catch (error) {
      throw new Error(`Something went wrong - ${error}`);
    }
  }

  public async login(email: string): Promise<User | null> {
    try {
      const user = await this.user.findOne({ email, deletedAt: null });
      return user;
    } catch (error) {
      throw new Error(`Something went wrong - ${error}`);
    }
  }

  public async updatePassword(
    userId: string,
    newPassword: string
  ): Promise<User | null> {
    try {
      const user = await this.user.findOneAndUpdate({
        id: userId,
        deletedAt: null,
      });
      return user;
    } catch (error) {
      throw new Error(`Something went wrong - ${error}`);
    }
  }
}

export default AuthService;
