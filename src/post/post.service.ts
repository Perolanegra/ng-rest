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

  public store(payload: any): Promise<Post | undefined> {
    return this.repository.store(
      PostEntity,
      payload,
      'Não foi possível adicionar o Post. Tente novamente.',
    );
  }

  public async add(payload: any): Promise<Post | undefined> {
    const postPayload = {
      id_issue: payload.id_issue,
      id_author: payload.id_author
    };
    const storedPost: Post = await this.repository.store(
      PostEntity,
      postPayload,
      'Não foi possível adicionar o Post. Tente novamente.',
    );

    // como eu so adiciono post do tipo textContent
    const contentPayload = {
      id_post: storedPost.id,
      id_issue: payload.id_issue,
      context: payload.context,
      enableNotifications: payload.enableNotifications
    }

    await this.issTxtContent.store(contentPayload);

    return storedPost;
  }
}
