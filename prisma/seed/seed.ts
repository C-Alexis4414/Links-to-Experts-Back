/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs
  const user1 = await prisma.user.create({
    data: {
      userName: 'JohnDoe',
      password: 'password123',
      email: 'john@example.com',
      is_Youtuber: true,
      is_Professional: true,
      youtuber: {
        create: {
          tagChannel: '@johnchannel'
        }
      },
      professional: {
        create: {
          urlLinkedin: 'https://linkedin.com/in/johndoe',
          recommandationLinkedin: JSON.stringify({ text: 'Great professional!' })
        }
      }
    }
  });

  const user2 = await prisma.user.create({
    data: {
      userName: 'JaneSmith',
      password: 'password123',
      email: 'jane@example.com',
      is_Youtuber: false,
      is_Professional: true,
      professional: {
        create: {
          urlLinkedin: 'https://linkedin.com/in/janesmith',
          recommandationLinkedin: JSON.stringify({ text: 'Highly recommended!' })
        }
      }
    }
  });

  const user3 = await prisma.user.create({
    data: {
      userName: 'AliceJohnson',
      password: 'password123',
      email: 'alice@example.com',
      is_Youtuber: true,
      is_Professional: false,
      youtuber: {
        create: {
          tagChannel: '@alicechannel'
        }
      }
    }
  });

  // // Créer des catégories
  const category1 = await prisma.category.create({
    data: {
      name: 'Technology',
      tags: {
        create: [
          { name: 'AI' },
          { name: 'Blockchain' }
        ]
      }
    }
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Health',
      tags: {
        create: [
          { name: 'Fitness' },
          { name: 'Nutrition' }
        ]
      }
    }
  });

  // Créer des likes
  await prisma.liked.create({
    data: {
      userId: user1.id,
      categoryId: category1.id
    }
  });

  await prisma.liked.create({
    data: {
      userId: user2.id,
      categoryId: category2.id
    }
  });

  await prisma.liked.create({
    data: {
      userId: user3.id,
      categoryId: category1.id
    }
  });

  // // Créer des abonnements
  await prisma.subscription.create({
    data: {
      userId: user1.id,
      subscriptionId: [user2.id, user3.id]
    }
  });

  await prisma.subscription.create({
    data: {
      userId: user2.id,
      subscriptionId: [user1.id, user3.id]
    }
  });

  await prisma.subscription.create({
    data: {
      userId: user3.id,
      subscriptionId: [user1.id]
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

