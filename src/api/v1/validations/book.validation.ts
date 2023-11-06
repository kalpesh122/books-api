import Joi from 'joi';
import IBook from '../interfaces/book.interface';

const user = Joi.object<User>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.string().optional(),
  resetPasswordToken: Joi.string().optional(),
  resetPasswordExpire: Joi.date().optional(),
  confirmEmailToken: Joi.string().optional(),
  isEmailConfirmed: Joi.boolean().required(),
  twoFactorCode: Joi.string().optional(),
  twoFactorCodeExpire: Joi.date().optional(),
  twoFactorEnabled: Joi.boolean().optional(),
  deletedAt: Joi.date().optional(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export default { user };
