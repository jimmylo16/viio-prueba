import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsPositive()
  cost: number;
  @IsString()
  accountId: string;
}
