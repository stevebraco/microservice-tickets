import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateSignin } from '../middlewares/validate-signin';

const router = express.Router();

router.post(
  '/api/users/signin',
  validateSignin,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError('Invalid credentials1');
    console.log(existingUser.password, password, 'COUCOU');

    const passwordsMatch = await Password.compare(
      password,
      existingUser.password
    );
    console.log('passwordsMatch', passwordsMatch);
    if (!passwordsMatch) throw new BadRequestError('Invalid credentials 2');

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! // on dit à typescript que JWT_KEY n'est pas undefined
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
