import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/clients.entity';
import * as bcrypt from 'bcrypt';
import { LoginClientDto } from './dto/login-client.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const { password, ...clientData } = createClientDto;
    // try {
    const client = this.clientRepository.create({
      ...clientData,
      password: bcrypt.hashSync(password, 10),
    });

    await this.clientRepository.save(client);

    delete client.password;

    return client;
    // } catch (error) {
    //   this.handleDBErrors(error);
    // }
  }
  async login(loginClientDto: LoginClientDto) {
    try {
      const { password, email } = loginClientDto;
      const client = await this.clientRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });
      if (!client) {
        throw new UnauthorizedException('Incorrect Credentials');
      }

      return client;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any) {
    console.log(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check logs');
  }
}
