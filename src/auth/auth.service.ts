
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private ngMailer: NgMailerService,
        @InjectConnection() private connection: Connection,
        private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = await this.usersService.findByUser(username);

        if (!user) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 401, message: 'Usuário inexistente.', title: 'Dados Inválidos.', type: 'error', style });
        }

        const { password, id_nivel, created_at, updated_at, deleted_at, ...result } = user;

        const passEncrypted = await bcrypt.hash(pass, 10); // encrypto novamente c o bcrypt

        if (!this.passwordsAreEqual(password, passEncrypted)) {
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

            if (!user) {
                const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
                throw new UnauthorizedException({ statusCode: 401, message: 'Usuário não encontrado.', title: 'Dados Inválidos.', type: 'error', style });
            }

            const { email } = user;

            const respMail = await this.ngMailer.sendPasswordEmail({ email });

            if(respMail && respMail.rejected.length === 0) {
                return {success: true}; // parametrizar esse kra dps
            }

        } catch (error) {
            throw error;
        }
    }

    private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }


}