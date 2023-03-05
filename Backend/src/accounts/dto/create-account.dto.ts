import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  accountName: string;
  @IsOptional()
  @IsString()
  accountDescription?: string;
  @IsString()
  clientId: string;
}
