import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

@Injectable()
export class IssueService {

  constructor(
    @TransactionRepository(Issue)
    @InjectRepository(Issue)
    private issueRespository: Repository<Issue>,
    private tagService: TagsService,
    private tokenService: TokenService,
    private postService: PostService,
    private issuePollService: IssuePollService,
    private issuePollResponseService: IssuePollResponseService,
    private issueTextContentService: IssueTextContentService,
    private repository: NgRepository) { }

  async store(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      getConnection().transaction(async manager => {

        const { issue, token } = payload;

        if (!issue.id_tags.length) throw new Error('Bad Request, parâmetros inválidos');
        const params = {
          entity: 'Tags',
          ids: issue.id_tags,
          output: 'entity.tags'
        };

        const resultSetTags = await this.tagService.getByGivenIds(params);

        if (resultSetTags.length) {
          const selectedTagsArr = (await resultSetTags).map(data => data.value);
          const selectedTagsStr = JSON.stringify(selectedTagsArr);
          const selectedTags = selectedTagsStr.substr(1, selectedTagsStr.length - 2);
          issue.tags = selectedTags.replace(/"/g, "");
        }

        const { id_user } = await this.tokenService.findByToken(token);
        issue.id_user = id_user;

        const storedIssue: Issue = await manager.getRepository(Issue).save(issue);

        const storedPost: Post = await this.storePost(id_user, storedIssue.id);

        const response = issue.typeSurveyContent ? await this.storePoll(issue.content, storedPost.id, storedIssue.id)
          : await this.storeTextContent(issue.content, storedPost.id, storedIssue.id);

        resolve(response);
      }).catch(err => {
        const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
        throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.' + err, title: 'Erro inesperado.', type: 'error', style });
      });
    });
  }

  getAll(): Promise<Issue[]> {
    return this.repository.getAll('Issues'); // por o paginate por 15, kda request.
  }

  private storePost(id_user: number, id_storedIssue: number) {
    const postPaylaod = {
      id_author: id_user,
      id_issue: id_storedIssue
    }

    return this.postService.store(postPaylaod);
  }

  private async storePoll(payload, id_storedPost: number, id_storedIssue: number): Promise<IssuePollResponse | any> {
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

  private storeTextContent(payload, id_storedPost: number, id_storedIssue: number): Promise<IssueTextContent | undefined> {
    const textContent = Object.assign({}, payload);
    textContent.id_post = id_storedPost;
    textContent.id_issue = id_storedIssue;

    return this.issueTextContentService.store(textContent);
  }

  async deleteById(req, id: number): Promise<void> {
    return getConnection().transaction(async manager => {
      manager.getRepository(Issue).delete(id);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Erro ao deletar Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

  async deleteAll(): Promise<void> {
    return getConnection().transaction(async manager => {
      manager.getRepository(Issue).clear();
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Erro ao deletar Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

  async getGeneral(): Promise<any[] | undefined> {
    return getConnection().createQueryBuilder('Issue', "entity")
      .select('*')
      .where("1=1 order by created_at ASC ")
      .getMany();
  }

}