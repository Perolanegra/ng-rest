
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, TransactionRepository, getConnection } from 'typeorm';


@Injectable()
export class UsersService {

  constructor(
    @TransactionRepository(User)
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findByUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    return getConnection().transaction(async manager => {
      manager.getRepository(User).delete(id);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Erro ao excluir conta. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

  async findByUsernameOrEmail(payload: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: `username = '${payload.toLowerCase()}' or email = '${payload.toLowerCase()}'`
    });
  }

  async resetPassword(password: string, _id: number): Promise<any | undefined> {
    return getConnection().transaction(async manager => {
      manager.getRepository(User).update(
        { id: _id },
        { password: password }
      );
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível redefinir a senha. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

  async store(payload): Promise<any | undefined> {
    return getConnection().transaction(async manager => {
      await manager.getRepository(User).save(payload);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível realizar o cadastro. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

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


}
