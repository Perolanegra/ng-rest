import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TransactionRepository, getConnection } from 'typeorm';
import { Token } from './token.entity';
import { NgException } from 'src/core/exception/ng-exception';

@Injectable()
export class TokenService {
  constructor(
    @TransactionRepository(Token)
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async store(payload: {
    token: string;
    id_user: number;
  }): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(await manager.getRepository(Token).save(payload));
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Não foi possível validar o seu acesso. Recarregue a página e tente novamente.',
              'Operação Indisponível',
              err,
            ).exception,
          );
        });
    });
  }

  getAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  findByIdUser(id: number): Promise<Token | undefined> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(manager.getRepository(Token).findOne({ id_user: id }));
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Seu token expirou, por favor solicite um novo acesso.',
              'Token Expirado',
              err,
            ).exception,
          );
        });
    });
  }

  async findByToken(access_token: string): Promise<Token | undefined> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(
            manager.getRepository(Token).findOne({ token: access_token }),
          );
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Seu token expirou, por favor solicite um novo acesso.',
              'Token Expirado',
              err,
            ).exception,
          );
        });
    });
  }
}
