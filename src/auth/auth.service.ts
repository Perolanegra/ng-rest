
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = await this.usersService.findByUser(username);
        
        if(!user) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 401, message: 'Usuário inexistente.', title: 'Dados Inválidos.', type: 'error', style });
        }

        const { password, ...result } = user;

        if(password !== pass) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 401, message: 'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la.', title: 'Dados Inválidos.', type: 'error', style });
        }

        return result;
    }

    async login(user: any) { // o parametro user eh o retorno do localstrategy validate
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}