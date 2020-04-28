
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({ passReqToCallback: true });
    }

    async validate(request: Request, username: string, password: string) {
        const contextId = ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(AuthService, contextId);

        let user;

        try {
            user = await authService.validateUser(username, password);
            if (!user) {
                throw new UnauthorizedException();
            }
        } catch (error) {
            throw error;
        }

        return user;
    }

}