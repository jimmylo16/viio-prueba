import { Account } from 'src/accounts/entities/account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionId: string;
  @Column()
  name: string;
  @Column({ default: '' })
  description: string;
  @Column({ default: 0 })
  cost: number;
  @ManyToOne(() => Account, (account) => account.accountId)
  account: Account;
}
