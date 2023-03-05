import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('text', { default: '' })
  lastName: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { select: false })
  password: string;
  @OneToMany(() => Account, (account) => account.client)
  accounts: Account[];
}
