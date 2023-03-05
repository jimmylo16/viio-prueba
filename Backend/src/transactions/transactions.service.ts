import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { accountId, ...transctionInfo } = createTransactionDto;

    const transaction = this.transactionRepository.create({
      ...transctionInfo,
      account: await this.accountRepository.findOneBy({ accountId }),
    });
    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async findByAccount(accountId: string) {
    const accounts = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.transactions', 'transaction')
      .where('account.accountId = :accountId', { accountId: accountId })
      .getOne();
    return accounts;
  }
  async findAll() {
    const accounts = await this.accountRepository.find({ take: 10, skip: 0 });
    return accounts;
  }

  async findOne(transactionId: string) {
    const transaction = await this.transactionRepository.findOneBy({
      transactionId,
    });
    console.log({ transaction });
    if (!transaction)
      throw new NotFoundException(
        `The client with the transactionId=${transactionId} was not found`,
      );
    return transaction;
  }

  async update(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionRepository.preload({
      transactionId,
      ...updateTransactionDto,
    });
    console.log(79, { ...updateTransactionDto });
    if (!transaction) {
      throw new NotFoundException(
        `The transaction with the id=${transactionId} was not found`,
      );
    }
    return this.transactionRepository.save(transaction);
  }

  async remove(transactionId: string) {
    const transaction = await this.findOne(transactionId);
    if (!transaction) {
      throw new NotFoundException(
        `The transaction with the transactionId=${transactionId} was not found`,
      );
    }

    await this.transactionRepository.remove(transaction);
    return { isDeleted: true };
  }
}
