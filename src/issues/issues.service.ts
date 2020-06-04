import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Issues } from './issues.entity';
import { getConnection, TransactionRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { NgRepository } from 'src/core/ng-respository.service';
import { PostService } from 'src/post/post.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class IssuesService {

  constructor(
    @TransactionRepository(Issues)
    @InjectRepository(Issues)
    private issuesRespository: Repository<Issues>,
    private tagService: TagsService,
    private tokenService: TokenService,
    private postService: PostService,
    private repository: NgRepository) { }

  async store(payload: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      getConnection().transaction(async manager => {
        if (payload.id_tags.length) {
          const params = {
            entity: 'Tags', 
            ids: [...payload.id_tags],
            output: 'entity.tags'
          };
    
          const resultSetTags = await this.tagService.getByGivenIds(params);
          
          if (resultSetTags.length) {
            const selectedTagsArr = (await resultSetTags).map(data => data.tags);
            const selectedTagsStr = JSON.stringify(selectedTagsArr);
            const selectedTags = selectedTagsStr.substr(1, selectedTagsStr.length - 2);
            payload.issues.tags = selectedTags.replace(/"/g, "");
          }
        }
  
        const { issue } = payload;
        const storedIssue = await manager.getRepository(Issues).save(issue);

        if (storedIssue && storedIssue.created_at) {
          const { id_user } = await this.tokenService.findByToken(payload.token);
          const postPaylaod = {
            id_issue: storedIssue.id_issue,
            context: payload.context,
            id_author: id_user
          }
  
          const storedPost = await this.postService.store(postPaylaod);
  
          if(storedPost && storedPost.created_at) {
            resolve({ ...storedIssue, ...storedPost });
          }
        }
      }).catch(err => {
        const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
        throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
      });
    });

  }

  getAll(): Promise<Issues[]> {
    return this.repository.getAll('Issues'); // por o paginate por 15, kda request.
  }

  async deleteById(req, id: number): Promise<void> {
    return getConnection().transaction(async manager => {
      manager.getRepository(Issues).delete(id);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Erro ao deletar Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }


}
