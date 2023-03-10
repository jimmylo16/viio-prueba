import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
