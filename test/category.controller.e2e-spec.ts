import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let agent: ReturnType<typeof request.agent>;
    let prisma: PrismaService;
    // let testUserId: number;

    const testUser = {
        email: 'j-b.goode@youlink.com',
        password: 'P@ssw0rd',
        // userName: 'TestUser',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());

        prisma = app.get(PrismaService);

        await app.init();

        // let existing = await prisma.user.findUnique({
        //     where: { email: testUser.email },
        // });

        // if (!existing) {
        //     const hashedPassword = await bcrypt.hash(testUser.password, 10);

        //     existing = await prisma.user.create({
        //         data: {
        //             email: testUser.email,
        //             password: hashedPassword,
        //             userName: testUser.userName,
        //         },
        //     });

        //     testUserId = existing.id;

        // const jwtService = new JwtService({ secret: 'test-secret' });
        // const payload = {
        //     userId: testUserId,
        //     email: testUser.email,
        //     userName: testUser.userName,
        // };
        // const accessToken = jwtService.sign(payload, { expiresIn: '1h' });
        // const refreshToken = jwtService.sign(
        //     { ...payload, type: 'refresh' },
        //     { expiresIn: '7d' },
        // );
        // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        // await prisma.user.update({
        //     where: { id: testUserId },
        //     data: {
        //         accessToken,
        //         hashRefreshToken: hashedRefreshToken,
        //         refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //     },
        // });
        // }

        agent = request.agent(app.getHttpServer());

        const loginResponse = await agent.post('/authentication/login').send({
            email: testUser.email,
            password: testUser.password,
        });

        expect([200, 201]).toContain(loginResponse.status);
    });

    it('should return 201 and create category when authenticated', async () => {
        const res = await agent
            .post('/category/createCategorie')
            .send({ name: 'informatique' })
            .expect(201);

        expect(res.body.name).toBe('informatique');
    });

    it('should return 401 if not authenticated', async () => {
        await request(app.getHttpServer())
            .post('/category/createCategorie')
            .send({ name: 'informatique' })
            .expect(401);
    });

    afterAll(async () => {
        await prisma.category.deleteMany({
            where: { name: 'informatique' },
        });

        await app.close();
    });
});
