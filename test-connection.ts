import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Connection to the database was successful!');
    } catch (e) {
        console.error('Failed to connect to the database', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
