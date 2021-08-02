import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { NgRepository } from 'src/core/ng-respository.service';

const TAG_ENTITY = 'Tags';
@Injectable()
export class TagsService {
    constructor(private repository: NgRepository) { }

    public async list(): Promise<Tags[] | undefined> {
        const payload = { output: ['entity.id', 'entity.value', 'entity.color'], entity: TAG_ENTITY };
        return this.repository.getEntityFields(payload) as Promise<Tags[]>;
    }

    public getByGivenIds(payload: any): Promise<Tags[] | undefined> {
        payload.entity = TAG_ENTITY;
        return this.repository.getEntityByGivenIds(payload);
    }
}

