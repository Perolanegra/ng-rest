import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssuePollResponse } from './issue-poll-response.entity';

const IssuePollResponseEntity: string = 'IssuePollResponse';
@Injectable()
export class IssuePollResponseService {

    constructor(private repository: NgRepository) { }

    public storeMany(payload: any): Promise<IssuePollResponse | undefined> {
        return this.repository.storeMany(IssuePollResponseEntity, payload, 'Não foi possível adicionar as opções da Enquete. Tente novamente.');
    }

}
