import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { z } from 'zod';
import jwt from 'jsonwebtoken';  
import { prisma } from './app';
import { NextFunction, Request, Response } from 'express';


dotenv.config();

const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserData = (user: User) => ({
  email: user.email,
});

export const createTokenForUser = (user: User) => {
  return jwt.sign(createUnsecuredUserData(user), process.env.JWT_SECRET);
};

const jwtInfoSchema = z.object({
  email: z.string(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, process.env.JWT_SECRET));
  } catch (e) {
    console.log(e);
    return null;
  }
};

//| JWT STUFF ///////////////
export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  console.log(req.headers.authorization);
  const [, token] = req.headers.authorization?.split?.(' ') || []; 

  const userJwtData = getDataFromAuthToken(token);

  if (!userJwtData) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const userFromJwt = await prisma.user.findFirst({
    where: {
      email: userJwtData.email,
    },
  });
  if (!userFromJwt) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = userFromJwt;
  next();
};
//| JWT STUFF////////////////
