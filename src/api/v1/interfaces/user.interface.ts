import mongoose, { Document } from 'mongoose';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: mongoose.Schema.Types.ObjectId;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  confirmEmailToken?: string;
  isEmailConfirmed: boolean;
  twoFactorCode?: string;
  twoFactorCodeExpire?: Date;
  twoFactorEnabled: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  getResetPasswordToken(): string;
  generateEmailConfirmToken(): string;
  getSignedJwtToken(): string;
  matchPassword(password: string | Buffer): boolean;
} & Document;

export default User;
