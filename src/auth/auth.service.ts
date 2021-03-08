import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';
import { NgException } from 'src/core/exception/ng-exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private ngMailer: NgMailerService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUser(username);

    if (!user) {
      throw new NgException(
        UnauthorizedException,
        'Usuário não encontrado.',
        'Acesso não autorizado',
      ).exception;
    }

    const {
      password,
      id_nivel,
      created_at,
      updated_at,
      deleted_at,
      ...result
    } = user;

    const isEqual = await this.passwordsAreEqual(pass, password);

    if (!isEqual) {
      throw new NgException(
        UnauthorizedException,
        'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la.',
        'Dados Inválidos',
      ).exception;
    }

    return result;
  }

  async login(user: any) {
    // o parametro user eh o retorno do localstrategy validate
    try {
      const response = {
        access_token: this.jwtService.sign(user, { expiresIn: '7h' }),
      };
      await this.tokenService.store({
        token: response.access_token,
        id_user: user.id,
      }); // grava o token da sessão
      return response;
    } catch (error) {
      throw error;
    }
  }

  async sendCredentialsEmail(payload) {
    try {
      const user = await this.usersService.findByUsernameOrEmail(payload);

      if (!user) {
        throw new NgException(
          UnauthorizedException,
          'Usuário não encontrado.',
          'Acesso não autorizado',
        ).exception;
      }

      const { id, email } = user;
      const access_token = this.jwtService.sign(
        { username: user.username, password: user.password },
        {
          expiresIn: '7m',
        },
      );

      const url = `${process.env.URL_FRONT}#/reset-password;bnag=${access_token}`;

      await this.tokenService.store({ token: access_token, id_user: id });

      const respMail = await this.ngMailer.sendPasswordEmail({ email, url });

      if (!respMail && respMail.rejected.length) {
        throw new NgException(
          InternalServerErrorException,
          'E-mail não enviado. Recarregue e tente novamente.',
          'Operação Indisponível',
        ).exception;
      }

      return {
        statusCode: 201,
        message:
          'Verifique sua caixa de email, enviamos um link para redefinição da senha.',
        title: 'E-mail Enviado.',
        type: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  private passwordsAreEqual(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  public async setResetPassword(
    password: string,
    req,
  ): Promise<any | undefined> {
    try {
      const tokenData = await this.tokenService.findByToken(
        req.headers.authorization.slice(7),
      );

      const encrypted = await bcrypt.hash(password, 10);

      await this.usersService.resetPassword(encrypted, tokenData.id_user);

      const style = {
        posTop: '5vh',
        posBottom: null,
        posLeft: null,
        posRight: null,
      };

      return {
        statusCode: 201,
        message: 'Senha redefinida com sucesso. Realize o login novamente.',
        title: 'Senha Redefinida.',
        type: 'success',
        style,
      };
    } catch (error) {
      throw error;
    }
  }

  public async signUp({
    name,
    username,
    pass,
    email,
  }): Promise<any | undefined> {
    try {
      const password = await bcrypt.hash(pass, 10);
      const userStored = await this.usersService.store({
        name,
        username,
        password,
        email,
      });

      const style = {
        posTop: '5vh',
        posBottom: null,
        posLeft: null,
        posRight: null,
      };

      return {
        statusCode: 201,
        message: 'Conta criada com Sucesso.',
        title: 'Conta Criada.',
        type: 'success',
        style,
      };
    } catch (error) {
      throw error;
    }
  }
}
