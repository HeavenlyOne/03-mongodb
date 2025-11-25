import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../models/user.js';

const { SECRET_KEY } = process.env;

export const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw createHttpError(401, 'Not authoraized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createHttpError(401, 'Not authoraized');
    }
      req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};
