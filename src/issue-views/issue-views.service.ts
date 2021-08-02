import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssueViews } from './issue-views.entity';

const IssueViewsEntity = 'IssueViews';

@Injectable()
export class IssueViewsService {
  constructor(private repository: NgRepository) {}

  public store(payload: {
    id_user: number;
    id_issue: number;
  }): Promise<any | undefined> {
    return this.repository.store(
      IssueViewsEntity,
      payload,
      'Erro Inesperado ao cadastrar visualizações.',
    );
  }

  public getById(payload: { id_issue: number, id_user: number }): Promise<IssueViews | undefined> {
    return this.repository.getOneByGivenParams({
      entity: IssueViewsEntity,
      query: { id: payload.id_issue, id_user: payload.id_user },
    });
  }
}
