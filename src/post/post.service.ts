import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { getConnection } from 'typeorm';
import { Post } from './post.entity';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';

const PostEntity: string = 'Post';
@Injectable()
export class PostService {
  constructor(
    private repository: NgRepository,
    private issTxtContent: IssueTextContentService,
  ) {}

  public getByIssueId(payload: {
    id_issue: number;
  }): Promise<any[] | undefined> {
    return getConnection()
      .createQueryBuilder(PostEntity, 'entity')
      .select('*')
      .where('entity.id_issue in =:id', { id: payload.id_issue })
      .orderBy('entity.created_at ASC')
      .getMany();
  }

  public async store(payload: any): Promise<Post | undefined> {
    const storedPost: Post = await this.repository.store(
      PostEntity,
      payload,
      'Não foi possível adicionar o Post. Tente novamente.',
    );
    
    // como eu so adiciono post do tipo textContent
    payload.content['id_issue'] = payload['id_issue'];
    payload.content['id_post'] = storedPost.id;
    await this.issTxtContent.store(payload.content);

    return storedPost;
  }
}
