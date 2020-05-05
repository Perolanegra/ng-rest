
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private ngMailer: NgMailerService,
        private tokenService: TokenService,
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

            const { id, email } = user;
            const access_token = this.jwtService.sign({username: user.username, password: user.password}, {
                expiresIn: '10m',
            });

            // await this.tokenService.store({ token: access_token, id_user: id });
            // const encrypted = await bcrypt.hash(id.toString(), 10);
            const url = `http://localhost:4200/#/reset-password;bnag=${access_token}`; // confirmar 

            const respMail = await this.ngMailer.sendPasswordEmail({ email, url });

            if (!respMail && respMail.rejected.length) {
                const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
                throw new InternalServerErrorException({ statusCode: 500, message: 'E-mail não enviado. Recarregue e tente novamente.', title: 'Operação indisponível.', type: 'error', style });
            }

            return { success: true }; // parametrizar esse kra dps

        } catch (error) {
            throw error;
        }
    }

    private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    public async getResetToken(id: number): Promise<any | undefined> {
        try {
            const { token, ...rest } = await this.tokenService.findByIdUser(id);
            return token;
        } catch (error) {
            throw error;
        }
    }

}