
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const userByName = await this.usersService.findByUser(username);
        
        if(!userByName) {
            throw new UnauthorizedException({ statusCode: 401, message: 'Usuário inexistente.', title: 'Dados Inválidos.', type: 'error' });
        }

        const { password, ...result } = userByName;

        if(password !== pass) {
            throw new UnauthorizedException({ statusCode: 401, message: 'Senha incorreta.', title: 'Dados Inválidos.', type: 'error' });
        }

        return result;
    }

    async login(user: any) { // o parametro user eh o retorno do localstrategy validate
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}