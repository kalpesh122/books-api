import mongoose from 'mongoose';
import User from '../../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt, { genSalt } from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRE = process.env.JWT_COOKIE_EXPIRE || 30;

const userSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: [true, 'Please add first Name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add last Name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    minlength: 6,
    select: false,
  },

  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  confirmEmailToken: {
    type: String,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  twoFactorCode: {
    type: String,
  },
  twoFactorCodeExpire: {
    type: Date,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Encrypt password using bcrypt while updating (admin)
// userSchema.pre('findOneAndUpdate', async function (next) {
//   const update = {p};
//   if (update && update.password) {
//     update.password = await bcrypt.hash(update.password, 10);
//   }
//   // console.log(this, 'DB-DEBUG');

//   next();
// });

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (
  enteredPassword: string | Buffer
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate email confirm token
userSchema.methods.generateEmailConfirmToken = function () {
  // email confirmation token
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  this.confirmEmailToken = crypto
    .createHash('sha256')
    .update(confirmationToken)
    .digest('hex');

  const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
  const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
  return confirmTokenCombined;
};

const userModel = mongoose.model<User>('User', userSchema);
export default userModel;
