
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) {
  }

  // async createMany(users: User[]) {
  //   const queryRunner = this.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(users[0]);
  //     await queryRunner.manager.save(users[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }

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

  // async getUser(_id: number): Promise<User[]> {
  //   return await this.usersRepository.find({
  //     select: ["fullName", "birthday", "isActive"],
  //     where: [{ "id": _id }]
  //   });
  // }

  // const qb = await getRepository(ArticleEntity)
  //     .createQueryBuilder('article')
  //     .leftJoinAndSelect('article.author', 'author');

  // User.findOneAndUpdate({ _id: userId }, { password: hash })
}