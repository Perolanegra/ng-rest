
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService { // Service é o cara q se comunica com o banco (queries, etc);
    constructor(
    private usersService: UsersService,
    private ngMailer: NgMailerService,
    private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = await this.usersService.findByUser(username);
        
        if(!user) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 401, message: 'Usuário inexistente.', title: 'Dados Inválidos.', type: 'error', style });
        }

        const { password, id_nivel, created_at, updated_at, deleted_at, ...result } = user;

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

    async sendCredentialsEmail(payload) {
        try {
            const user = await this.usersService.findByUsernameOrEmail(payload);
            
            if(!user) {
                const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
                throw new UnauthorizedException({ statusCode: 401, message: 'Usuário não encontrado.', title: 'Dados Inválidos.', type: 'error', style });
            }

            const { email, id } = user;

            // const resp = await this.usersService.setForgotPass(id, '1');
            // console.log('resp: ', resp);
            
            // // const { changedRows } = updated.raw;

            // if(changedRows) {
                return await this.ngMailer.sendPasswordEmail({ email });
            // }

        } catch (error) {
            throw error;
        }

    }

   
}