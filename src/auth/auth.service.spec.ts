import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepo: Repository<User>; 
  let jwtService: JwtService;

  const REPOSITORY_TOKEN = getRepositoryToken(User);
  const registerDto = {
    name: 'mohamed',
    email: 'aboantar852003@gmail.com',
    password: 'pass123',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'lk@ifjfj^fjl*6f'),
          },
        },
        { provide: ConfigService, useValue: {} },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(() => Promise.resolve(true)),
            create: jest.fn(() => {
              return registerDto;
            }),
          },
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<User>>(REPOSITORY_TOKEN);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should authService be defined', () => { 
    expect(authService).toBeDefined();
  });
  it('should registerDtoRepo be defined', () => {
    expect(userRepo).toBeDefined();
  });

  describe('register', () => {
    it("Should call 'create' method in registerDtoRepo", async () => {
      await authService.register(registerDto);
      expect(userRepo.create).toHaveBeenCalled();
      expect(userRepo.create).toHaveBeenCalledTimes(1);
    });

    it("Should call 'save' method in registerDtoRepo", async () => {
      await authService.register(registerDto);
      expect(userRepo.save).toHaveBeenCalled();
      expect(userRepo.save).toHaveBeenCalledTimes(1);
    });
    it("Should call 'sign' method in jwtService", async () => {
      await authService.register(registerDto);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledTimes(1); 
    });

    it('Should return newUser & token', async () => {
      const newUser = await authService.register(registerDto);
      expect(newUser).toMatchObject({
        name: 'mohamed',
        email: 'aboantar852003@gmail.com',
        token: 'lk@ifjfj^fjl*6f',
      });
    }); 
  });
});
