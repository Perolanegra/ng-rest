import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';

const IssueViewsEntity = 'IssueViews';

@Injectable()
export class IssueViewsService {
    constructor(private repository: NgRepository) { }

    public store(payload: { id_user: number, id_issue: number }): Promise<any | undefined> {
        return this.repository.store(IssueViewsEntity, payload, 'Erro Inesperado ao cadastrar visualizações.');
    }
}
