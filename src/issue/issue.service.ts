import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Issue } from './issue.entity';
import { getConnection, TransactionRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

const IssueEntity: string = 'Issue';
@Injectable()
export class IssueService {
  private readonly logger = new Logger(IssueService.name);

  constructor(
    @TransactionRepository(Issue)
    @InjectRepository(Issue)
    private tagService: TagsService,
    private tokenService: TokenService,
    private postService: PostService,
    private issuePollService: IssuePollService,
    private issuePollResponseService: IssuePollResponseService,
    private issueTextContentService: IssueTextContentService,
    private repository: NgRepository,
  ) { }

  async store(payload: any): Promise<any | undefined> {
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
            payloadTags
          );

          if (resultSetTags.length) {
            const selectedTagsArr = (await resultSetTags).map(
              data => data.value,
            );
            const selectedTagsStr = JSON.stringify(selectedTagsArr);
            const selectedTags = selectedTagsStr.substr(
              1,
              selectedTagsStr.length - 2
            );
            issue.tags = selectedTags.replace(/"/g, '');
          }

          const resultSetToken = await this.tokenService.findByToken(token);
          const { id_user } = resultSetToken;
          issue.id_user = id_user;

          const storedIssue: Issue = await manager
            .getRepository(Issue)
            .save(issue);

          const storedPost: Post = await this.postService.store({
            id_author: id_user,
            id_issue: storedIssue.id
          });

          const response = issue.typeSurveyContent
            ? await this.storePoll(issue.content, storedPost.id, storedIssue.id)
            : await this.storeTextContent(
              issue.content,
              storedPost.id,
              storedIssue.id
            );

          resolve(response);
        })
        .catch(err => {
          reject(
            new NgException(
              InternalServerErrorException,
              'Não foi possível criar o Issue. Recarregue e tente novamente.',
              'Erro inesperado',
              err
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
  ): Promise<IssuePollResponse | any> {
    const { formArrOpt, ...pollParams } = payload;

    const pollContent = Object.assign({}, pollParams);
    pollContent.id_post = id_storedPost;
    pollContent.id_issue = id_storedIssue;

    const storedPoll = await this.issuePollService.store(pollContent);
    const { id } = storedPoll;

    const issuePollResponsePayload: Array<any> = [];

    (formArrOpt as Array<string>).forEach((answer: string) => {
      issuePollResponsePayload.push({ id_poll: id, answer: answer });
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
