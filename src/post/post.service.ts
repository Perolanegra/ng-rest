import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Post } from './post.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class PostService {
    constructor(private repository: NgRepository) { }


    public getByIssueId(payload: { id_issue: number }): Promise<any | undefined> {
        return getConnection().createQueryBuilder('Post', "entity")
            .select('*')
            .where("entity.id_issue in =:id", { id: payload.id_issue })
            .orderBy('entity.created_at ASC')
            .getMany();
    }
}
