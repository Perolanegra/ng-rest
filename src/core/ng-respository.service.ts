import {
  Injectable,
  InternalServerErrorException,
  Logger,
  HttpStatus,
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
    this.logger.log(`Persistência de dados: [Store ${entity}]`);
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

  /**
   *  payload = {
   *      id: 5,
   *      values: {
   *          password: '12232',
   *          name: 'dsad'
   *      }
   *  }
   */
  public update(
    entity: string,
    payload: any,
    errorMsg: string,
  ): Promise<any | undefined> {
    this.logger.log(`Persistência de dados: [Update ${entity}]`);
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
    this.logger.log(`Persistência de dados: [Delete ${entity}]`);
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

  // public getById2(payload: {
  //   entity: string;
  //   id: number;
  //   output: string;
  // }): Promise<any | undefined> {
  //   this.logger.log(`Transaction: [GetById ${payload.entity}]`);
  //   return getConnection()
  //     .createQueryBuilder(payload.entity, 'entity')
  //     .select(payload.output)
  //     .where('entity.id = :id', { id: payload.id })
  //     .getOne();
  // }

  public getById(payload: { entity: string; id: number }): Promise<any | {}> {
    this.logger.log(`Transaction: [GetById ${payload.entity}]`);
    return getConnection()
      .manager.getRepository(payload.entity)
      .findOne(payload.id);
  }

  // /**
  //  *
  //  * @param payload objeto que define as características do resultSet.
  //  * @param payload.entity stringParam da Entidade que será executada a query.
  //  * @param payload.ids ids que serão buscados.
  //  * @param payload.output colunas que serão retornadas em string, seguindo padrão: 'entity.column1, entity.column2'.
  //  * @author igor.alves
  //  */
  // public getEntityByGivenIds(payload: {
  //   entity: string;
  //   ids: number[];
  //   output: string;
  // }): Promise<any[] | undefined> {
  //   this.logger.log(`Transaction: [GetByIds ${payload.entity}]`);
  //   return getConnection()
  //     .createQueryBuilder(payload.entity, 'entity')
  //     .select(payload.output)
  //     .where('entity.id in (:ids)', { ids: [...payload.ids] })
  //     .getMany();
  // }

  async getEntityByGivenIds(payload: {
    entity: string;
    ids: number[];
    output: string;
  }): Promise<any[] | undefined> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(await manager.getRepository(payload.entity).findByIds(payload.ids));
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Recarregue e tente novamente mais tarde.',
              'Erro inesperado',
              err,
            ).exception,
          );
        });
    });
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
    this.logger.log(`Persistência de dados: [StoreMany ${entity}]`);
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

  public getEntityFields(payload: any): Promise<any[] | undefined> {
    this.logger.log(`Transaction: [GetFields ${payload.entity}]`);
    return getConnection()
      .createQueryBuilder(payload.entity, 'entity')
      .select(payload.output)
      .where(payload.condition || '1=1')
      .getMany();
  }

  /**
   *
   * @param payload objeto seguinte: { entity: 'string', query: { id: 'value', author: 'value' } }
   */
  public getOneByGivenParams(payload: any): Promise<any | undefined> {
    return getConnection()
      .manager.getRepository(payload.entity)
      .findOne({
        where: payload.query,
      });
  }

  /**
   *
   * @param payload objeto seguinte: { entity: 'string', query: { id: 'value', author: 'value' } }
   */
   public getByGivenParams(payload: any): Promise<any[] | undefined> {
    return getConnection()
      .manager.getRepository(payload.entity)
      .find({
        where: payload.query,
      });
  }

  public getByGivenQuery(payload: {
    entity: string;
    sql: string;
    errorMsg: string;
    sqlParams?: any[]
  }): Promise<any[] | undefined> {
    this.logger.log(`Recuperando Dados: [GetByGivenQuery ${payload.entity}]`);
    return new Promise((resolve, reject) => {
      getConnection()
        .manager.query(payload.sql, payload.sqlParams)
        .then((data: any) => resolve(data))
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              payload.errorMsg,
              'Erro Inesperado',
              err,
            ).exception,
          );
        });
    });
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
