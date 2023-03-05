import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/auth/entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const { clientId, ...accountInfo } = createAccountDto;

    const account = this.accountRepository.create({
      ...accountInfo,
      client: await this.clientRepository.findOneBy({ id: clientId }),
    });
    await this.accountRepository.save(account);
    return account;
  }

  async findAll() {
    const accounts = await this.accountRepository.find({ take: 10, skip: 0 });
    return accounts;
  }
  async findByClient(id: string) {
    const client = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.accounts', 'account')
      .where('client.id = :id', { id: id })
      .getOne();
    if (!client)
      throw new NotFoundException(`The client with the id=${id} was not found`);
    return client;
  }

  async findOne(accountId: string) {
    const account = await this.accountRepository.findOneBy({ accountId });
    if (!account)
      throw new NotFoundException(
        `The client with the accountId=${accountId} was not found`,
      );
    return account;
  }

  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.preload({
      accountId,
      ...updateAccountDto,
    });
    console.log(79, { ...updateAccountDto });
    if (!account) {
      throw new NotFoundException(
        `The account with the id=${accountId} was not found`,
      );
    }
    return this.accountRepository.save(account);
  }

  async remove(accountId: string) {
    const account = await this.findOne(accountId);
    if (account) {
      throw new NotFoundException(
        `The account with the accountId=${accountId} was not found`,
      );
    }
    // if (account.length === 0) {
    //   throw new NotFoundException(`The account was already deleted`);
    // }
    await this.accountRepository.remove(account);
    return { isDeleted: true };
  }
}
