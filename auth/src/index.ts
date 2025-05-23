import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/errors-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler); // capture les erreurs et les formattent

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  console.log(process.env.JWT_KEY);

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongodb');
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
