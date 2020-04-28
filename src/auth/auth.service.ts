
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = await this.usersService.findOne(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) { // o parametro user eh o retorno do localstrategy validate
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}