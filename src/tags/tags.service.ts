import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { NgRepository } from 'src/core/ng-respository.service';

@Injectable()
export class TagsService {
    constructor(private repository: NgRepository) { }

    public async list(): Promise<Tags[] | undefined> {
        const payload = { output: ['entity.id', 'entity.value'], entity: 'Tags' };
        return this.repository.getEntityFields(payload) as Promise<Tags[]>;
    }

    public getByGivenIds(payload): Promise<Tags[] | undefined> {
        return this.repository.getEntityByGivenIds(payload);
    }
}

