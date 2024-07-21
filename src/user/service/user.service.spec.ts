// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from "../service/user.service";
// import { ProfessionalService } from "../service/professional.service";
// import { YoutuberService } from "../service/youtuber.service";
// import { UserController } from '../controller/user.controller';
// import { PrismaService } from 'src/prisma.service';


// describe('UserService', () => {
//     let userService: UserService;
//     let userController: UserController;
//     let youtuberService: YoutuberService;
//     let professionalService: ProfessionalService;

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             providers: [UserService, ProfessionalService, YoutuberService, { provide: PrismaService, useClass: PrismaService }],
//             controllers: [UserController],
//             exports: [UserService]
//         }).compile();
//         userService = moduleRef.get(UserService);
//         userController = moduleRef.get(UserController);
//     });

//     describe('FindOneUserById', async () => {
//         it('should return information about the user with typed data', async () => {

//         })
//     })

// })