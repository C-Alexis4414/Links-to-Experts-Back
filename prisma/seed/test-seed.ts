import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'j-b.goode@youlink.com';
    const plainPassword = 'P@ssw0rd';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (!existing) {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                userName: 'TestUser',
            },
        });

        console.log(`✅ Test user ${email} created`);
    } else {
        console.log(`ℹ️ Test user ${email} already exists`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
