
import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { registerUserSchema } from '../schemas/usersSchemas.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { getCurrent, login, logout, register } from '../controllers/authControllers.js';
import { auth } from '../helpers/auth.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(register));
usersRouter.post('/login', validateBody(registerUserSchema), ctrlWrapper(login))
usersRouter.post('/logout', auth, ctrlWrapper(logout))
usersRouter.get('/current', auth, ctrlWrapper(getCurrent));

export default usersRouter;
