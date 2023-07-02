import { prisma } from '../src/app';
import { encryptPassword } from '../src/auth-utils';

const clearDb = async () => {
  await prisma.user.deleteMany();
  await prisma.pages.deleteMany();
};

const seed = async () => {
  console.log('Seeding the database...');
  await clearDb();

  //| Seed Users
  const zak = await prisma.user.create({
    data: {
      id: 1,
      email: 'zak@zak.com',
      name: 'Zak',
      passwordHash: await encryptPassword('password'),
    },
  });

  const jon = await prisma.user.create({
    data: {
      id: 2,
      email: 'Jon@Jon.com',
      name: 'Jon',
      passwordHash: await encryptPassword('password'),
    },
  });

  const tyson = await prisma.user.create({
    data: {
      id: 3,
      email: 'tyson@ty.com',
      name: 'Tyson',
      passwordHash: await encryptPassword('password'),
    },
  });

  const VGK = await prisma.pages.create({
    data: {
      id: 1,
      name: 'VGK',
      pageState: 'Nevada',
      pageCity: 'Las Vegas',
      sport: 'NHL',
      homeVenue: 'T-mobile Arena',
    },
  });
  const LVR = await prisma.pages.create({
    data: {
      id: 2,
      name: 'Raiders',
      pageState: 'Nevada',
      pageCity: 'Las Vegas',
      sport: 'NFL',
      homeVenue: 'Allegiant',
    },
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
