import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, TransactionRepository, getConnection } from 'typeorm';
import { NgException } from 'src/core/exception/ng-exception';
import { PostService } from 'src/post/post.service';
import { UserSignUpDTO } from './dto/user-sign-up.dto';

@Injectable()
export class UsersService {
  // TODO: retornar as promises, e nos blocos de catch retornar com o reject()
  constructor(
    @TransactionRepository(User)
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private postService: PostService
  ) {}

  public async getDetails(payload: any): Promise<any | undefined> {
    const postNumber = await this.postService.getCountByIdAuthor({ id_author: payload.id });
    payload['user_post_number'] = postNumber['user_post_number'];
    return payload;
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

  async remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(manager.getRepository(User).delete(id));
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Erro ao excluir conta. Recarregue e tente novamente.',
              'Erro inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  async findByUsernameOrEmail(payload: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: `username = '${payload.toLowerCase()}' or email = '${payload.toLowerCase()}'`,
    });
  }

  async resetPassword(password: string, _id: number): Promise<any | undefined> {
    return getConnection()
      .transaction(async manager => {
        manager.getRepository(User).update({ id: _id }, { password: password });
      })
      .catch(err => {
        throw new NgException(
          InternalServerErrorException,
          'Não foi possível redefinir a senha. Recarregue e tente novamente.',
          'Erro inesperado',
        ).exception;
      });
  }

}
