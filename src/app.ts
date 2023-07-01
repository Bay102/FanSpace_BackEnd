import express from 'express';
import 'express-async-errors';
import { PrismaClient, User } from '@prisma/client';
import { userController } from './routers/user.router';

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //! Figure out this 
  res.setHeader('Access-Control-Allow-Headers', 'Authorization ,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

export const prisma = new PrismaClient();

app.use(userController)

declare global {
   namespace Express {
     interface Request {
       user?: User;
     }
   }
 
   namespace NodeJS {
     export interface ProcessEnv {
       DATABASE_URL: string;
       JWT_SECRET: string;
     }
   }
 }

const port = 3000;
app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
