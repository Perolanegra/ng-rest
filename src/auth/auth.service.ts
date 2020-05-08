
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
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

        const isEqual = await this.passwordsAreEqual(pass, password);

        if (!isEqual) {
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
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };

            if (!user) throw new UnauthorizedException({ statusCode: 401, message: 'Usuário não encontrado.', title: 'Dados Inválidos.', type: 'error', style });

            const { id, email } = user;
            const access_token = this.jwtService.sign({ username: user.username, password: user.password }, {
                expiresIn: '7m',
            });

            const url = `http://localhost:4200/#/reset-password;bnag=${access_token}`;

            await this.tokenService.store({ token: access_token, id_user: id });

            const respMail = await this.ngMailer.sendPasswordEmail({ email, url });

            if (!respMail && respMail.rejected.length) {
                throw new InternalServerErrorException({ statusCode: 500, message: 'E-mail não enviado. Recarregue e tente novamente.', title: 'Operação indisponível.', type: 'error', style });
            }

            return { statusCode: 200, message: 'Verifique sua caixa de email, enviamos um link para redefinição da senha.', title: 'E-mail Enviado.', type: 'success', style };

        } catch (error) {
            throw error;
        }
    }

    private passwordsAreEqual(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    public async setResetPassword({ access_token, password }): Promise<any | undefined> {
        try {
            this.isAuthenticated(access_token, 'Acesso Expirado.', 'Senha não redefinida. Por favor, realize uma nova solicitação.');

            const { id_user } = await this.tokenService.findByToken(access_token);
            const encrypted = await bcrypt.hash(password, 10);

            await this.usersService.resetPassword(encrypted, id_user);

            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };

            return { statusCode: 200, message: 'Senha redefinida com sucesso. Realize o login novamente.', title: 'Senha Redefinida.', type: 'success', style };

        } catch (error) {
            throw error;
        }
    }

    private isAuthenticated(token: string, errTitle: string, errMsg: string): void {
        try {
            this.jwtService.verify(token);
        } catch (error) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new InternalServerErrorException({ statusCode: 500, message: errMsg, title: errTitle, type: 'error', style });
        }
    }

}