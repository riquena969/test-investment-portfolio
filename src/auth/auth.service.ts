import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private userService: UserService) { }

    async doLogin(loginDto: LoginDto) {
        try {
            const user = await this.userService.findByEmail(loginDto.email);

            if (!await bcrypt.compare(loginDto.password, user.password)) {
                throw new UnauthorizedException('Email or password is incorrect¹');
            }

            const token = await this.getToken(user);

            delete user.password;

            return { token, user };
        } catch (e) {
            console.error('error', e);
            throw new UnauthorizedException('Email or password is incorrect²');
        }
    }

    async getToken(user: users) {
        const { id, name, email } = user;

        return this.jwtService.sign({ id, name, email });
    }

    async decodeToken(token: string) {
        try {
            await this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

        return this.jwtService.decode(token);
    }
}
