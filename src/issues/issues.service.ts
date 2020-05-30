import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Issues } from './issues.entity';
import { getConnection } from 'typeorm';
import { CoreService } from 'src/core/core.service';

@Injectable()
export class IssuesService {

    constructor(private core: CoreService) { }

    async store(req, payload: any): Promise<any | undefined> {
        this.core.authorize(req);

        return getConnection().transaction(async manager => {
          await manager.getRepository(Issues).save(payload);
        }).catch(err => {
          const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
          throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
        });
    }

}
