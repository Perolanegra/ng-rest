import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssueTextContent } from './issue-text-content.entity';

const IssueTextContentEntity: string = 'IssueTextContent';
@Injectable()
export class IssueTextContentService {

    constructor(private repository: NgRepository) { }

    public store(payload: any): Promise<IssueTextContent | undefined> {
        return this.repository.store(IssueTextContentEntity, payload, 'Não foi possível adicionar o IssueTextContent. Tente novamente.');
    }

}
