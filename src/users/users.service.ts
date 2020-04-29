
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
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
        created_at: new Date('27-04-2020'),
        deleted_at: null,
        updated_at: null
      },
      {
        userId: 2,
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
        created_at: new Date('27-04-2020'),
        deleted_at: null,
        updated_at: null
      },
    ];
  }

  async findByUser(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findByPass(password: string): Promise<User | undefined> {
    return this.users.find(user => user.password === password);
  }
}