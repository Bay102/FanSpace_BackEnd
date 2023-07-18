import express from 'express';
import 'express-async-errors';
import { PrismaClient, User } from '@prisma/client';
import { userController } from './routers/user.router';
import cors from 'cors'
import { channelController } from './routers/channels.router';

const app = express();

app.use(express.json());

app.use(cors());

export const prisma = new PrismaClient();

app.use(userController); 
app.use(channelController)

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

//! Docker Port 
// const port = 8080;

//! Supabase Port 
const port = 5432;

app.listen(port, () => console.log(`🚀 Server ready & listening at: http://192.168.4.28:${port}`));
