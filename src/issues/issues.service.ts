import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Issues } from './issues.entity';
import { getConnection } from 'typeorm';
import { CoreService } from 'src/core/core.service';

@Injectable()
export class IssuesService {

  constructor(private core: CoreService) { }

  async store(req, payload: any): Promise<any | undefined> {
    this.core.authorize(req, 'Sessão Expirada.', 'Realize o login novamente para poder criar o Issue.');

    return getConnection().transaction(async manager => {
      await manager.getRepository(Issues).save(payload);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      if(err.code === 'ER_NO_DEFAULT_FOR_FIELD') throw new BadRequestException();
      throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

}
