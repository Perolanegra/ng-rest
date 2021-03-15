import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Issue } from './issue.entity';
import { getConnection } from 'typeorm';
import { TagsService } from 'src/tags/tags.service';
import { NgRepository } from 'src/core/ng-respository.service';
import { PostService } from 'src/post/post.service';
import { TokenService } from 'src/token/token.service';
import { Post } from 'src/post/post.entity';
import { IssuePollService } from 'src/issue-poll/issue-poll.service';
import { IssuePollResponseService } from 'src/issue-poll-response/issue-poll-response.service';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';
import { IssuePollResponse } from 'src/issue-poll-response/issue-poll-response.entity';
import { IssueTextContent } from 'src/issue-text-content/issue-text-content.entity';
import { NgException } from 'src/core/exception/ng-exception';
// @ts-ignore
import * as SQL from 'assets/sql/sql.json';

const IssueEntity: string = 'Issue';
@Injectable()
export class IssueService {
  private readonly logger = new Logger(IssueService.name);

  constructor(
    private tagService: TagsService,
    private tokenService: TokenService,
    private postService: PostService,
    private issuePollService: IssuePollService,
    private issuePollResponseService: IssuePollResponseService,
    private issueTextContentService: IssueTextContentService,
    private repository: NgRepository,
  ) {}

  store(payload: any): Promise<any | undefined> {
    this.logger.log(`Persistência Store Issue: ${payload}`);
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          const { issue, token } = payload;

          if (!issue.id_tags.length) {
            throw new NgException(
              BadRequestException,
              'Parâmetros Inválidos.',
              'Erro inesperado',
              'id_tags is []',
            ).exception;
          }

          const payloadTags = {
            ids: issue.id_tags,
            output: 'entity.value',
          };

          const resultSetTags = await this.tagService.getByGivenIds(
            payloadTags,
          );

          if (resultSetTags.length) {
            let tags = '',
              colors = '';

            for (let i = 0; i < (await resultSetTags).length; i++) {
              tags =
                i === resultSetTags.length - 1
                  ? tags.concat(resultSetTags[i].value)
                  : tags.concat(resultSetTags[i].value).concat(',');

              colors =
                i === resultSetTags.length - 1
                  ? colors.concat(resultSetTags[i].color)
                  : colors.concat(resultSetTags[i].color).concat(',');
            }

            issue.tags = tags;
            issue.tag_colors = colors;
          }

          const resultSetToken = await this.tokenService.findByToken(token);
          const { id_user } = resultSetToken;
          issue.id_user = id_user;

          const storedIssue: Issue = await manager
            .getRepository(Issue)
            .save(issue);

          const storedPost: Post = await this.postService.store({
            id_author: id_user,
            id_issue: storedIssue.id,
          });

          issue.typeSurveyContent
            ? await this.storePoll(issue.content, storedPost.id, storedIssue.id)
            : await this.storeTextContent(
                issue.content,
                storedPost.id,
                storedIssue.id,
              );

          resolve(storedIssue);
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Não foi possível criar o Issue. Recarregue e tente novamente.',
              'Erro inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  getAll(): Promise<Issue[]> {
    return this.repository.getAll(IssueEntity); // TODO: por o paginate por 15, kda request.
  }

  private async storePoll(
    payload,
    id_storedPost: number,
    id_storedIssue: number,
  ): Promise<IssuePollResponse | undefined> {
    const { formArrOpt, ...pollParams } = payload;

    const pollContent = Object.assign({}, pollParams);
    pollContent.id_post = id_storedPost;
    pollContent.id_issue = id_storedIssue;

    const storedPoll = await this.issuePollService.store(pollContent);
    const { id } = storedPoll;

    const issuePollResponsePayload: Array<any> = [];

    (formArrOpt as Array<string>).forEach((answer: string) => {
      issuePollResponsePayload.push({ id_poll: id, answer });
    });

    return this.issuePollResponseService.storeMany(issuePollResponsePayload);
  }

  private storeTextContent(
    payload,
    id_storedPost: number,
    id_storedIssue: number,
  ): Promise<IssueTextContent | undefined> {
    const textContent = Object.assign({}, payload);
    textContent.id_post = id_storedPost;
    textContent.id_issue = id_storedIssue;

    return this.issueTextContentService.store(textContent);
  }

  async updateStars(payload: { id: number; values }): Promise<any> {
    return this.repository.update(IssueEntity, payload, 'Erro ao votar.');
  }

  async getDetailsById(payload: { id: number }): Promise<any | undefined> {
    const features = SQL.issue.features as Array<any>;
    const sql = features.find(feature => feature['getDetailsById']);

    const details = await this.repository.getByGivenQuery({
      entity: IssueEntity,
      errorMsg: 'Erro ao recuperar os detalhes do Issue. Tente novamente.',
      sql: (sql['getDetailsById'] as string).concat(` ${payload.id}`),
    });

    if (!details.length) {
      throw new NgException(
        InternalServerErrorException,
        'O Issue não foi encontrado. Por favor, Recarregue e tente novamente.',
        'Erro Inesperado',
      ).exception;
    }

    return details;
  }

  async getPollDetailById(payload: { id: number }): Promise<any | undefined> {
    const features = SQL.issue.features as Array<any>;
    const sql = features.find(feature => feature['getPollDetailsById']);

    const pollDetailsArr = await this.repository.getByGivenQuery({
      entity: IssueEntity,
      errorMsg: 'Erro ao recuperar os detalhes da enquete. Tente novamente.',
      sql: (sql['getPollDetailsById'] as string).concat(` ${payload.id}`),
    });

    if (!pollDetailsArr.length) {
      throw new NgException(
        InternalServerErrorException,
        'A Enquete não foi encontrada. Por favor, Recarregue e tente novamente.',
        'Erro Inesperado',
      ).exception;
    }

    const pollDetails = pollDetailsArr[0];
    const arrAnswer: Array<{
      answer: string;
    }> = await this.issuePollResponseService.getAnswersByIdIssue(payload);
    pollDetails.answers = new Array<string>();
    arrAnswer.forEach((el: { answer: string }) => {
      pollDetails.answers.push(el.answer);
    });

    return pollDetails;
  }

  async deleteById(req, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(manager.getRepository(Issue).delete(id));
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Erro ao deletar Issue. Recarregue e tente novamente.',
              'Erro inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  async deleteAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      getConnection()
        .transaction(async manager => {
          resolve(manager.getRepository(Issue).clear());
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Erro ao deletar Issue. Recarregue e tente novamente.',
              'Erro inesperado',
              err,
            ).exception,
          );
        });
    });
  }

  async getGeneral(): Promise<any[] | undefined> {
    return getConnection()
      .createQueryBuilder('Issue', 'entity')
      .select('*')
      .where('1=1 order by created_at ASC ')
      .getMany();
  }
}
