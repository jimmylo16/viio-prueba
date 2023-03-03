import { Account } from 'src/accounts/entities/account.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn({ type: 'uuid' })
  transactionId: string;
  @ManyToMany(() => Account, (account) => account.transactions)
  account: Account;
}
