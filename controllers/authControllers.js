import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, `Email ${email} in use`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 201,
    ResponseBody: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw createHttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 200,
    ResponseBody: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

export const getCurrent = async (req, res) => {
  const {email, subscription } = req.user;

  res.json({
    status: 200,
    ResponseBody: {
      user: {
        email,
        subscription
      }
    },
  });
};
