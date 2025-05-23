import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { validateSignup } from '../middlewares/validate-signup';

const router = express.Router();

router.post(
  '/api/users/signup',
  validateSignup,
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('Signup request received');

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError('Email in use');

    const user = User.build({
      email,
      password,
    });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // on dit à typescript que JWT_KEY n'est pas undefined
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
