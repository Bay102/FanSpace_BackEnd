import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../app";
import { createTokenForUser, createUnsecuredUserData, encryptPassword } from "../auth-utils";
import bcrypt from 'bcrypt';


const userController = Router();

//| Get Users 
userController.get('/user', async (req, res) => { 
  console.log('connected');
  const users = await prisma.user.findMany()
  res.send(users)
})


//| Create New User 
userController.post(
   '/user/create',
   validateRequest({
     body: z.object({
       name: z.string(),
       email: z.string(),
       password: z.string()
     }),
   }),
   async (req, res) => {    
     try {
       const foundUser = await prisma.user.findUnique({
         where: {
           email: req.body.email,
         },
       });
 
       if (foundUser) {
         return res.status(404).json({ message: 'Username Taken' });
       }
 
       const user = await prisma.user.create({
         data: {
           name: req.body.name,
           email: req.body.email,
           passwordHash: await encryptPassword(req.body.password),
         },
       });
 
       res.status(201).json({ user });
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: error });
     }
   }
 );


//| Login
userController.post(
   '/user/login',
   validateRequest({
     body: z.object({
       email: z.string(),
       password: z.string(),
     }),
   }),
   async (req, res) => {
     try {
       const user = await prisma.user.findFirst({
         where: {
           email: req.body.email,
         },
       });
 
       if (!user) {
         return res.status(404).json({ message: 'username does not exist' });
       }
 
       const isPasswordCorrect = await bcrypt.compare(
         req.body.password,
         user.passwordHash
       );
 
       if (!isPasswordCorrect) {
         return res.status(401).send({ message: 'Incorrect Password' });
       }
 
       const userId = user?.id;
       const userInformation = createUnsecuredUserData(user);
       const token = createTokenForUser(user);
 
       res.status(200).json({ token, userInformation, userId });
     } catch (error) {
       console.error(error);
       res.status(404).json({ message: 'username does not exist' });
     }
   }
 );

export {userController}