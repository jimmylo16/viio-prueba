import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

export class UpdateClientDto extends PartialType(CreateAccountDto) {}
