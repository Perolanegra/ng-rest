
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection, TransactionRepository, Transaction, getConnection } from 'typeorm';


@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @TransactionRepository(User)
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findByUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findByPass(password: string): Promise<User | undefined> {
    return this.users.find(user => user.password === password);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByUsernameOrEmail(payload: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: `username = '${payload.toLowerCase()}' or email = '${payload.toLowerCase()}'`
    });
  }

  // async setForgotPass(id: number, payload: string): Promise<any | undefined> {
  //   return await getConnection().transaction(async manager => {
  //     manager.getRepository(User).update(
  //       { id: id },
  //       { hasForgotPass: payload }
  //     );
  //     throw new Error();
  //   }).catch(err => {
  //     const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
  //     throw new InternalServerErrorException({ statusCode: 500, message: 'Recarregue a página e tente novamente.', title: 'Operação indisponível.', type: 'error', style });
  //   });
  // }

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
