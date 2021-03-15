import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssuePollResponse } from './issue-poll-response.entity';
// @ts-ignore
import * as SQL from 'assets/sql/sql.json';

const IssuePollResponseEntity: string = 'IssuePollResponse';
@Injectable()
export class IssuePollResponseService {
  constructor(private repository: NgRepository) {}

  public storeMany(payload: any): Promise<IssuePollResponse | undefined> {
    return this.repository.storeMany(
      IssuePollResponseEntity,
      payload,
      'Não foi possível adicionar as opções da Enquete. Tente novamente.',
    );
  }

  public getAnswersByIdIssue(payload: {
    id: number;
  }): Promise<Array<{ answer: string }> | undefined> {
    const features = SQL.issuePollResponse.features as Array<any>;
    const sql = features.find(feature => feature['getAnswersByIdIssue']);

    return this.repository.getByGivenQuery({
      entity: IssuePollResponseEntity,
      errorMsg: 'Erro ao recuperar o PollAnswer. Tente novamente.',
      sql: (sql['getAnswersByIdIssue'] as string).concat(` ${payload.id}`),
    });
  }
}
