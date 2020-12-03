
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TransactionRepository, getConnection } from 'typeorm';
import { Token } from './token.entity';


@Injectable()
export class TokenService {

  constructor(
    @TransactionRepository(Token)
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) { }

  async store(payload: { token: string, id_user: number }): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      getConnection().transaction(async manager => {
        resolve(await manager.getRepository(Token).save(payload));
      }).catch(err => {
        const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
        reject(new InternalServerErrorException({ statusCode: 500, message: 'Recarregue a página e tente novamente.', err, title: 'Operação indisponível.', type: 'error', style }));
      });
    })
  }

  getAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  findByIdUser(id: number): Promise<Token | undefined> {
    return getConnection().transaction(async manager => {
      return manager.getRepository(Token).findOne({ id_user: id });
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Seu token expirou, por favor solicite um novo acesso.', title: 'Token Expirado.', type: 'error', style });
    });
  }

  async findByToken(access_token: string): Promise<Token | undefined> {
    return getConnection().transaction(async manager => {
      return manager.getRepository(Token).findOne({ token: access_token });
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Seu token expirou, por favor solicite um novo acesso.', title: 'Token Expirado.', type: 'error', style });
    });
  }




}
