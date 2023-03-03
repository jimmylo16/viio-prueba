import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Client {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column('text')
  name: string;
  @Column('text')
  lastName: string;
  @Column({ unique: true })
  email: string;
  @OneToMany(() => Account, (account) => account.client)
  accounts: Account[];
}
