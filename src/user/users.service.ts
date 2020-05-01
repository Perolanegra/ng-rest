
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
      this.users = [
        {
          id: 1,
          username: 'perolanegra',
          password: 'ge7OBMv703BbeQZNnB52OA==',
          id_nivel: 1,
          name: 'Igor',
          lastName: 'Alves',
          statusMsg: 'she wanna hang wit the starboy',
          ddd: '071',
          phone: '993337275',
          email: 'igoralves@devbaiano.com.br',
          photoURL: 'string',
          birthDate: new Date('25-08-1996'),
          created_at: null,
          deleted_at: null,
          updated_at: null
        },
        {
          id: 2,
          username: 'chris',
          password: 'secret',
          id_nivel: 4,
          name: 'Gabriel',
          lastName: 'Santos',
          statusMsg: 'she wanna hang wit the starboy',
          ddd: '071',
          phone: '993337275',
          email: 'igoralves@devbaiano.com.br',
          photoURL: 'string',
          birthDate: new Date('25-08-1996'),
          created_at: null,
          deleted_at: null,
          updated_at: null
        },
      ];
  }

  async createMany(users: User[]) {
    const queryRunner = this.connection.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);
  
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findByUser(username: string): Promise<User | undefined> {
    // return this.usersRepository.findOne({ where: { username: username } });
    return this.users.find(user => user.username === username);
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

  // const qb = await getRepository(ArticleEntity)
  //     .createQueryBuilder('article')
  //     .leftJoinAndSelect('article.author', 'author');
}