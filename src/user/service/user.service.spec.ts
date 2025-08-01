
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('UserService', () => {
    let service: UserService;
    let prismaService: PrismaService;

    const mockUser = {
        id: 1,
        userName: 'testUser',
        email: 'testuser@youlink.com',
        password: 'P@ssw0rd',
        is_Youtuber: true,
        is_Professional: true,
        youtuber: {
            tagChannel: '@testuser1234',
        },
        professional: {
            urlLinkedin: 'https://www.linkedin.com/in/test-user/',
        },
    };

    const prismaMock = {
        user: {
            create: jest.fn().mockResolvedValue(mockUser),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        prismaService = module.get<PrismaService>(PrismaService);

        jest.spyOn(service, 'verifyYTChannel').mockResolvedValue(true);
        jest.spyOn(service, 'verifyLinkedinSkills').mockResolvedValue(true);
    });

    it('should create a user', async () => {
    const dto = { 
        userName: 'testUser',
        email: 'testuser@youlink.com',
        password: 'P@ssw0rd',
        is_Youtuber: true,
        is_Professional: true,
        tagChannel: 'testuser1234',
        urlLinkedin: 'https://www.linkedin.com/in/test-user/',
    };
        const result = await service.createUser(dto);
        expect(prismaService.user.create).toHaveBeenCalledWith({
            data: {
                userName: dto.userName,
                email: dto.email,
                password: dto.password,
                is_Youtuber: dto.is_Youtuber,
                is_Professional: dto.is_Professional,
                youtuber: {
                    create: {
                        tagChannel: dto.tagChannel,
                    },
                },
                professional: {
                    create: {
                        urlLinkedin: dto.urlLinkedin,
                        recommandationLinkedin: {},
                    },
                },
            },
            include: {
                youtuber: true,
                professional: true,
            },        
        });
        expect(result).toEqual(mockUser);
    });

    // Add your UserService specific tests here
});
