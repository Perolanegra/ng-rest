import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Post } from './post.entity';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';
// @ts-ignore
import * as SQL from 'assets/sql/sql.json';
import { NgException } from 'src/core/exception/ng-exception';

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
      id_author: payload.id_author,
      author: payload.author,
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
      enableNotifications: payload.enableNotifications,
    };

    await this.issTxtContent.store(contentPayload);

    return storedPost;
  }

  public async getCountByIdAuthor(payload: {
    id_author: string;
  }): Promise<{ user_post_number: string } | undefined> {
    const features = SQL.post.features as Array<any>;
    const sql = features.find(feature => feature['getCountByIdAuthor']);

    const postCountArr = await this.repository.getByGivenQuery({
      entity: PostEntity,
      errorMsg: 'Erro ao recuperar o seu número de postagens. Tente novamente.',
      sql: (sql['getCountByIdAuthor'] as string).concat(
        ` ${payload.id_author}`,
      ),
    });

    if (!postCountArr.length) {
      throw new NgException(
        InternalServerErrorException,
        'Não foi possível contar suas postagens. Por favor, Recarregue e tente novamente.',
        'Erro Inesperado',
      ).exception;
    }

    return postCountArr[0];
  }

  async updateStars(payload: {
    id: number;
    id_issue: number;
    id_author: number;
    values: { stars: number; pplVoted: number };
  }): Promise<any> {
    const post: Post = await this.repository.getById({
      entity: PostEntity,
      id: payload.id,
    });
    payload.values.stars = post.stars + payload.values.stars;
    payload.values.pplVoted = post.pplVoted + 1;
    // tem que enviar o nick do author também
    return this.repository.update(PostEntity, payload, 'Erro ao votar.');
  }
}
