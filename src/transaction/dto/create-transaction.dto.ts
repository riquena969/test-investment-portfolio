import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPositive, IsString } from 'class-validator';

export enum Operations {
  BUY = 'BUY',
  SELL = 'SELL',
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsEnum(Operations)
  operation: Operations;

  @ApiProperty()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @IsPositive()
  unitary_value: number;
}
