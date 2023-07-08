import { Router } from 'express';
import { authenticationMiddleware } from '../auth-utils';
import { prisma } from '../app';
import { validateRequest } from 'zod-express-middleware';

const channelController = Router();

//> GET all Channels
channelController.get('/channels/all', async (_req, res) => {
  const allChannels = await prisma.channels.findMany();

  if (!allChannels) {
    res.status(400).json({ message: 'Error Fetching' });
  }
  res.status(200).json(allChannels);
});

//> Load Channel Data 

//> User Add Channel

channelController.patch('/:userId/follow/:channelId', async (req, res) => {

  const followChannel = await prisma.channels.update({
     where: { id: +req.params.channelId },
     data: {
       users: {
         connect: { id: +req.params.userId },
       },
     },
   });

   if (!followChannel) {
    throw new Error('Opps... Somthing Weird Happened')
   }

   res.status(200).json(followChannel)
})

//> Get User Channels
channelController.get('/user/:id/pages', async (req, res) => {
  const usersPages = await prisma.user.findMany({
    where: {
      id: +req.params.id,
    },
    include: {
      channels: true,
    },
  });

  if (!usersPages) {
    return res.status(400).json({ message: 'no pages found' });
  }

  res.status(200).json(usersPages);
});

export { channelController };
