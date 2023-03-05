import { Client } from 'src/auth/entities/clients.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;
  @Column('text')
  accountName: string;
  @Column('text', { default: '' })
  accountDescription?: string;
  @ManyToOne(() => Client, (client) => client.accounts)
  client: Client;
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
