import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/clients.entity';

const oneClient = new Client();
describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            create: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // describe('create', () => {
  //   it('should create a Client', async () => {
  //     const repoSpy = jest.spyOn(repo, 'create');
  //     expect(repoSpy).toBeCalledTimes(1);
  //   });
  // });
});
