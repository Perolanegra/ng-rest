import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoreService {

    constructor(private jwtService: JwtService) { }


    private isAuthenticated(token: string, errTitle: string, errMsg: string): void {
        try {
            this.jwtService.verify(token);
        } catch (error) {
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 500, message: errMsg, title: errTitle, type: 'error', style });
        }
    }

    public authorize(req) {
        const base_auth = req.headers.authorization;
        if(!base_auth) throw new UnauthorizedException();

        const splitted = base_auth.split(' ');

        const { ...token } = splitted;

        this.isAuthenticated(token, 'Acesso Expirado.', 'Realize a operação novamente.');
    }

}
