
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, getConnection, QueryRunner, EntityManager, TransactionManager, Connection } from 'typeorm';




// establish real database connection using our new query runner


@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @TransactionManager() public manager: EntityManager,
    @InjectConnection()
    private readonly connection: Connection
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

  async setForgotPass(id: number, payload: any): Promise<boolean | undefined> { // isso funciona
    
    const queryRunner = this.connection.createQueryRunner();
    
    // establish real database connection using our new query runner
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`UPDATE user SET hasForgotPass = '${payload}' WHERE id = ${id};`);
      throw new Error('teste');
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback changes we made
      queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed Transaction. Rolling back.');

    } finally {
      // you need to release query runner which is manually created:
      queryRunner.release();
    }

    return true;
  }

  async create(
    id: number, payload: string
  ) {
     await this.manager.update(User, id, {hasForgotPass: payload});
     throw new Error ( 'wrong') 
   
    return 'Creating Success';
  }

}
