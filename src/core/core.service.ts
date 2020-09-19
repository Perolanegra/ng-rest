import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoreService {

    constructor(private jwtService: JwtService) { }


    private isAuthenticated(token: string, errTitle: string, errMsg: string): UnauthorizedException | void {
        try {
            this.jwtService.verify(token);

        } catch (error) {
            // console.log('erro Origin: ', error);
            const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
            throw new UnauthorizedException({ statusCode: 401, message: errMsg, title: errTitle, type: 'error', style });
        }
    }

    public authorize(req, title, errorMsg): UnauthorizedException | void {
        try {
            const { authorization } = req.headers;
            if (!authorization) throw new UnauthorizedException();

            const splitted = authorization.split(' ');

            const { ...tokenArr } = splitted;
            
            this.isAuthenticated(tokenArr[1], title, errorMsg);
        } catch (error) {
            throw error;
        }

    }

}
