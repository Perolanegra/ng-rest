import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Issues } from './issues.entity';
import { getConnection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IssuesService {

    constructor(private jwtService: JwtService) { }

    async store(payload, req: any): Promise<any | undefined> { // por o comportamento do metodo em algo centralizado com as funções do crud.
        const base_auth = req.headers.authorization;
        if(!base_auth) throw new UnauthorizedException();

        const splitted = base_auth.split(' ');

        const { ...token } = splitted;

        this.isAuthenticated(token, 'Acesso Expirado.', 'Por favor, realize o login novamente.');

        return getConnection().transaction(async manager => {
          await manager.getRepository(Issues).save(payload);
        }).catch(err => {
          const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
          throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
        });
    }

    public isAuthenticated(token: string, errTitle: string, errMsg: string): void {
        try {
            this.jwtService.verify(token);
        } catch (error) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 500, message: errMsg, title: errTitle, type: 'error', style });
        }
    }

}
