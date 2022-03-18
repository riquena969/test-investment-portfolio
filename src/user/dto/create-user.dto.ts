import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'Kevin' })
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({ default: 'kevin@devoriginal.com' })
  @IsEmail()
  @MaxLength(64)
  email: string;

  @ApiProperty({ default: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ default: '1000' })
  @IsPositive()
  amount: number;
}
