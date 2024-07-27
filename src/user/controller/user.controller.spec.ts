// import { UserService } from "../service/user.service";
// import { ProfessionalService } from "../service/professional.service";
// import { YoutuberService } from "../service/youtuber.service";
// import { UserController } from "./user.controller";
// import { UserType } from "../type/user.type";

// describe("UserController", () => {
//     let userController: UserController;
//     let userService: UserService;
//     let professionalService: ProfessionalService;
//     let youtuberService: YoutuberService;
//     beforeEach(() => {
//         userController = new UserController(userService, youtuberService, professionalService);
//     });

//     describe('findOneUserById', () => {
//         it('should return information about the user with typed data', async () => {

//         })
//     })
// })

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn(() => 'Hello World!'),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});


