import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { getConnection } from 'typeorm';
import { Post } from './post.entity';

const PostEntity: string = 'Post';

@Injectable()
export class PostService {
    constructor(private repository: NgRepository) { }


    public getByIssueId(payload: { id_issue: number }): Promise<any[] | undefined> {
        return getConnection().createQueryBuilder(PostEntity, "entity")
            .select('*')
            .where("entity.id_issue in =:id", { id: payload.id_issue })
            .orderBy('entity.created_at ASC')
            .getMany();
    }

    public store(payload: any): Promise<Post | undefined> {
        return this.repository.store(PostEntity, payload, 'Não foi possível adicionar o Post. Tente novamente.');
    }
}
