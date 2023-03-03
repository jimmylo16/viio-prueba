import { Client } from 'src/clients/entities/client.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn({ type: 'uuid' })
  accountId: string;
  @Column('text')
  accountName: string;
  @ManyToMany(() => Client, (client) => client.accounts)
  client: Client;
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
