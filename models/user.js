import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match: emailRegex,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

export const User = model("user", userSchema)
