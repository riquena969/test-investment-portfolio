import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ default: 'Kevin' })
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiPropertyOptional({ default: 'kevin@devoriginal.com' })
  @IsEmail()
  @MaxLength(64)
  email: string;

  @ApiPropertyOptional({ default: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ default: '1000' })
  @IsPositive()
  amount: number;
}
