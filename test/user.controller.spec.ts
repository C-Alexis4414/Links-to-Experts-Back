import * as request from 'supertest';
import { INestApplication, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';

import { UserController } from '../src/user/controller/user.controller';
import { UserService } from '../src/user/service/user.service';
import { YoutuberService } from '../src/user/service/youtuber.service';
import { ProfessionalService } from '../src/user/service/professional.service';

describe('UserController (e2e with mock)', () => {
    let app: INestApplication;
    let allowGuard: boolean;
    const mockGuard = {
        canActivate: (context: ExecutionContext) => {
            if (allowGuard) {
                const req = context.switchToHttp().getRequest();
                req.user = { userId: 1 };
                return true;
            }
            throw new UnauthorizedException();
        },
    };
    const mockUserService = {
        deleteUser: jest.fn().mockResolvedValue({
            userId: 1,
        }),
    };

    const createApp = async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: YoutuberService, useValue: {} },
                { provide: ProfessionalService, useValue: {} },
            ],
        })
            .overrideGuard(AuthGuard('delete'))
            .useValue(mockGuard)
            .compile();

        const app = moduleFixture.createNestApplication();
        await app.init();
        return app;
    };

    afterEach(async () => {
        if (app) await app.close();
    });

    it('should return 200 and delete user with mockedguard', async () => {
        allowGuard = true;
        app = await createApp();
        const res = await request(app.getHttpServer()).delete('/user/deleteUser').expect(200);

        expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
        expect(res.body).toEqual({ message: 'User deleted' });
    });

    it('should return 401 if no guard allow access', async () => {
        allowGuard = false;
        app = await createApp();
        await request(app.getHttpServer())
            .delete('/user/deleteUser')
            .set('Authorization', '')
            .expect(401);
    });
});
