import { Injectable } from '@nestjs/common';
import { IssuePoll } from './issue-poll.entity';
import { NgRepository } from 'src/core/ng-respository.service';

const IssuePollEntity: string = 'IssuePoll';
@Injectable()
export class IssuePollService {

    constructor(private repository: NgRepository) { }

    public store(payload: any): Promise<IssuePoll | undefined> {
        return this.repository.store(IssuePollEntity, payload, 'Não foi possível adicionar a Enquete. Tente novamente.');
    }

}
