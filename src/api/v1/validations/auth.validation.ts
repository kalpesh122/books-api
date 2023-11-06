import User from '../interfaces/user.interface';
import Joi from 'joi';
const register = Joi.object<Partial<User>>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.string().optional(),
});

const login = Joi.object<Partial<User>>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePassword = Joi.object<any>({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
export default { register, login, updatePassword };
