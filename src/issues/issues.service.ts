import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Issues } from './issues.entity';
import { getConnection, TransactionRepository, Repository } from 'typeorm';
import { CoreService } from 'src/core/core.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { NgRepository } from 'src/core/ng-respository.service';

@Injectable()
export class IssuesService {

  constructor(
    @TransactionRepository(Issues)
    @InjectRepository(Issues)
    private issuesRespository: Repository<Issues>,
    private tagService: TagsService,
    private repository: NgRepository,
    private core: CoreService) { }

  async store(payload: any): Promise<any | undefined> {
    
    if(payload.id_tags.length) {
      const resultSetTags = await this.tagService.getByGivenIds(payload.id_tags);
      if(resultSetTags.length) {
        const selectedTagsArr = (await resultSetTags).map(data => data.tags);
        const selectedTagsStr = JSON.stringify(selectedTagsArr);
        const selectedTags = selectedTagsStr.substr(1, selectedTagsStr.length - 2);
        payload.issues.tags = selectedTags.replace(/"/g, "");
      }
    }

    return getConnection().transaction(async manager => {
      const { issues } = payload;
      const storedIssue = await manager.getRepository(Issues).save(issues);
      if (storedIssue && storedIssue.created_at) {

        // chamo os outros serviços pra fazer os Joins com as entidades relacionadas.
      }

    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Não foi possível criar o Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }

  getAll(): Promise<Issues[]> {
    return this.repository.getAll('Issues'); // por o paginate por 15, kda request.
  }

  async deleteById(req, id: number): Promise<void> {
    this.core.authorize(req, 'Sessão Expirada.', 'Realize o login novamente.');
    return getConnection().transaction(async manager => {
      manager.getRepository(Issues).delete(id);
    }).catch(err => {
      const style = { positionTop: '5vh', positionBottom: null, positionLeft: null, positionRight: null };
      throw new InternalServerErrorException({ statusCode: 500, message: 'Erro ao deletar Issue. Recarregue e tente novamente.', title: 'Erro inesperado.', type: 'error', style });
    });
  }


}
