import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common"
import { AuthRequest } from "./auth-req-interface";
import { CoreService } from "./core.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly core: CoreService) { }

    use(req: AuthRequest, res: Response, next: Function) {
        console.log('Request...');
        try {
            if (!req.headers) throw new UnauthorizedException();
            this.core.authorize(req, 'Acesso Expirado.', 'Realize o login novamente.');
            next();
        } catch (error) {
            throw error;
        } 
    }
}