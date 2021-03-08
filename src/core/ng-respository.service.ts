import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { NgException } from './exception/ng-exception';

/**
 * Service que contém os métodos defaults.
 */
@Injectable()
export class NgRepository {
  private readonly logger = new Logger(NgRepository.name);

  constructor() {}

  public getAll(entity: string): Promise<any[] | undefined> {
    return getConnection()
      .manager.getRepository(entity)
      .find();
  }

  /**
   * @author igor.alves
   * @param entity Entidade em string a ser persistida
   * @param payload Objeto da entidade com suas devidas propriedades para persistência dos dados.
   * @param errorMsg Mensagem que deverá ser lançada caso a inserção de dados dê erro.
   */
  public store(
    entity: string,
    payload: any,
    errorMsg: string,
  ): Promise<any | undefined> {
    // errorMsg ex: 'Não foi possível criar o Issue. Recarregue e tente novamente.'
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          const storedPayload = await manager
            .getRepository(entity)
            .save(payload);
          resolve(storedPayload);
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              errorMsg,
              'Erro Inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  public update(
    entity: string,
    payload: any,
    errorMsg: string,
  ): Promise<any | undefined> {
    // errMsg ex: 'Não foi possível redefinir a senha. Recarregue e tente novamente.'
    /**
     *  payload = {
     *      id: 5,
     *      values: {
     *          password: '12232',
     *          name: 'dsad'
     *      }
     *  }
     */
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          const updated = await manager
            .getRepository(entity)
            .update({ id: payload.id }, { ...payload.values });
          resolve(updated);
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              errorMsg,
              'Erro Inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  public delete(
    entity: string,
    id: number,
    errorMsg: string,
  ): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          const deleted = await manager
            .getRepository(entity)
            .update({ id: id }, { deleted_at: new Date().toLocaleString() });
          resolve(deleted);
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              errorMsg,
              'Erro Inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  public getById(payload: {
    entity: string;
    id: number[];
    output: string;
  }): Promise<any | undefined> {
    return getConnection()
      .createQueryBuilder(payload.entity, 'entity')
      .select(payload.output)
      .where('entity.id in =:id', { id: payload.id })
      .getOne();
  }

  /**
   *
   * @param payload objeto que define as características do resultSet.
   * @param payload.entity stringParam da Entidade que será executada a query.
   * @param payload.ids ids que serão buscados.
   * @param payload.output colunas que serão retornadas em string, seguindo padrão: 'entity.column1, entity.column2'.
   * @author igor.alves
   */
  public getEntityByGivenIds(payload: {
    entity: string;
    ids: number[];
    output: string;
  }): Promise<any[] | undefined> {
    return getConnection()
      .createQueryBuilder(payload.entity, 'entity')
      .select(payload.output)
      .where('entity.id in (:ids)', { ids: [...payload.ids] })
      .getMany();
  }

  /**
   * @author igor.alves
   * @param entity Entidade em string a ser persistida
   * @param payload Array de Objeto(s) da entidade com suas devidas propriedades para persistência dos dados.
   * @param errorMsg Mensagem que deverá ser lançada caso a inserção de dados dê erro.
   */
  public storeMany(
    entity: string,
    payload: any,
    errorMsg: string,
  ): Promise<any | undefined> {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(payload)
      .execute()
      .catch(err => {
        throw new NgException(
          InternalServerErrorException,
          errorMsg,
          'Erro Inesperado',
          err,
        ).exception;
      });
  }

  public getEntityFields(payload: any) {
    return getConnection()
      .createQueryBuilder(payload.entity, 'entity')
      .select(payload.output)
      .getMany();
  }
}

// return this.tagsRespository.find( { retornando tudo
//     where: `id IN(${payload})`
// });

// async setForgotPass(id: number, payload: any): Promise<any | undefined> {
//   const queryRunner = await this.beginTran();
//   let resp;

//   try {
//     resp = await queryRunner.query(`UPDATE user SET hasForgotPass = '${payload}' WHERE id = ${id};`);
//     await queryRunner.commitTransaction();
//   } catch (err) {
//     // since we have errors lets rollback changes we made
//     queryRunner.rollbackTransaction();
//     throw new BadRequestException('Operação indisponível no momento. Recarregue a página e tente novamente.');

//   } finally {
//     queryRunner.release();
//   }

//   return resp;
// }

// async beginTran() {
//   const queryRunner = this.connection.createQueryRunner();

//   await queryRunner.connect();
//   await queryRunner.startTransaction();

//   return queryRunner;
// }
