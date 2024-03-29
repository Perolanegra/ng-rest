import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Account } from './account.entity';

const AccountEntity: string = 'Account';

@Injectable()
export class AccountService {
  constructor(private ngRepository: NgRepository) {}

  public getByIdUser(id_user: number): Promise<Account[] | undefined> {
    return this.ngRepository.getByGivenParams({
      entity: AccountEntity,
      query: { id_user: id_user },
    });
  }

  public store(id_user: number): Promise<Account | undefined> {
    return this.ngRepository.store(
      AccountEntity,
      { id_user },
      'Erro ao cadastrar conta. Tente novamente.',
    );
  }
}
