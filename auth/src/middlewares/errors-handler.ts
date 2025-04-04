import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Somenthing went wrong', err);

  if (err instanceof CustomError) {
    console.log('file errors-handler');
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }
};
