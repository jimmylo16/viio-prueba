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
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateClientDto } from './dto/update-client.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const alreadyCreated = await this.clientRepository.find({
      where: { email: createClientDto.email },
    });
    if (alreadyCreated.length === 1) {
      return {
        msg: `The user with the ${createClientDto.email} was already created`,
      };
    }
    const { password, ...clientData } = createClientDto;
    // try {
    const client = this.clientRepository.create({
      ...clientData,
      password: bcrypt.hashSync(password, 10),
    });

    await this.clientRepository.save(client);

    delete client.password;
    return {
      ...client,
      token: this.getJwtToken({ email: client.email }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  async login(loginClientDto: LoginClientDto) {
    const { password, email } = loginClientDto;
    const client = await this.clientRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    if (!client) {
      throw new UnauthorizedException('Credentials are not valid (Email)');
    }
    if (!bcrypt.compareSync(password, client.password)) {
      throw new UnauthorizedException('Credentials are not valid (Password)');
    }

    return {
      ...client,
      token: this.getJwtToken({ email: client.email }),
    };
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check logs');
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id,
      ...updateClientDto,
    });
    if (!client) {
      throw new NotFoundException(`The Client with the id=${id} was not found`);
    }
    return this.clientRepository.save(client);
  }

  async delete(id: string) {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException(`The Client with the id=${id} was not found`);
    }
    await this.clientRepository.remove(client);
    return { isDeleted: true };
  }
  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client)
      throw new NotFoundException(`The client with the id=${id} was not found`);
    return client;
  }
  async findAll() {
    const client = await this.clientRepository.find({
      take: 10,
      skip: 0,
    });
    if (!client) throw new NotFoundException(`Clients Does not exists`);
    return client;
  }
}
