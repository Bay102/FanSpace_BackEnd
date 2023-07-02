import express from 'express';
import 'express-async-errors';
import { PrismaClient, User } from '@prisma/client';
import { userController } from './routers/user.router';
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors());

export const prisma = new PrismaClient();

app.use(userController); 

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

const port = 8080;
app.listen(port, () => console.log(`🚀 Server ready at: http://localhost:${port}`));
