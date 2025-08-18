// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, ExecutionContext } from '@nestjs/common';
// import * as request from 'supertest';
// import * as cookieParser from 'cookie-parser';
// import { CategoryController } from '../controller/category.controller';
// import { CategoryService } from '../service/category.service';
// import { AuthGuard } from '@nestjs/passport';

// describe('CategoryController (secure access with cookie)', () => {
//   let app: INestApplication;

//   const mockCategory = {
//     id: 10,
//     name: 'informatique',
//     likes: [],
//     tags: [],
//   };

//   const mockCategoryService = {
//     createCategory: jest.fn().mockResolvedValue(mockCategory),
//   };

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       controllers: [CategoryController],
//       providers: [
//         {
//           provide: CategoryService,
//           useValue: mockCategoryService,
//         },
//       ],
//     })
//       .overrideGuard(AuthGuard('jwt'))
//       .useValue({
//         canActivate: (context: ExecutionContext) => {
//           const req = context.switchToHttp().getRequest();
//           // simulation d’un utilisateur authentifié
//           req.user = { userId: 36, userName: 'Johnny B. Goode' };
//           return true;
//         },
//       })
//       .compile();

//     app = moduleFixture.createNestApplication();
//     app.use(cookieParser());
//     await app.init();
//   });

//   it('should create a category if user is authenticated via cookie', async () => {
//     const res = await request(app.getHttpServer())
//       .post('/category/createCategorie')
//       .set(
//         'Cookie',
//         'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkpvaG5ueSBCLiBHb29kZSIsInVzZXJJZCI6MzYsInJ0IjoiJDJiJDEwJGxJYkhNWDJrZ0hSVVRMaGQxZXBqYnVXWG1CSFYwQkRucVRsdjNSNW4wOHh0TGw0WDlHLjRpIiwiaWF0IjoxNzUyODQwNzg1LCJleHAiOjE3NTI4NDEwODV9.Gy43ZomFviOapLVNpk0L8UobA3v9_qKyJG-VhTRtEtQ' // token fictif
//       )
//       .send({ name: 'informatique' })
//       .expect(201);

//     expect(res.body).toEqual(mockCategory);
//     expect(mockCategoryService.createCategory).toHaveBeenCalledWith({
//       name: 'informatique',
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });

// jest.setTimeout(20000);

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let agent: ReturnType<typeof request.agent>;
    let prisma: PrismaService;
    let testUserId: number;

    const testUser = {
        email: 'j-b.goode@youlink.com',
        password: 'P@ssw0rd',
        userName: 'TestUser',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());

        prisma = app.get(PrismaService);

        await app.init();

        let existing = await prisma.user.findUnique({
            where: { email: testUser.email },
        });

        if (!existing) {
            const hashedPassword = await bcrypt.hash(testUser.password, 10);

            existing = await prisma.user.create({
                data: {
                    email: testUser.email,
                    password: hashedPassword,
                    userName: testUser.userName,
                },
            });

            testUserId = existing.id;

            const jwtService = new JwtService({ secret: 'test-secret' });
            const payload = {
                userId: testUserId,
                email: testUser.email,
                userName: testUser.userName,
            };
            const accessToken = jwtService.sign(payload, { expiresIn: '1h' });
            const refreshToken = jwtService.sign(
                { ...payload, type: 'refresh' },
                { expiresIn: '7d' },
            );
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

            await prisma.user.update({
                where: { id: testUserId },
                data: {
                    accessToken,
                    hashRefreshToken: hashedRefreshToken,
                    refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
        }

        // Initialise l'agent et se connecte
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
