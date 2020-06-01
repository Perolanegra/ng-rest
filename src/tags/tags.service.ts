import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { getConnection } from 'typeorm';
import { NgRepository } from 'src/core/ng-respository.service';

@Injectable()
export class TagsService {
    constructor(private repository: NgRepository) { }

    public getAll(): Promise<Tags[] | undefined> {
        return this.repository.getAll('Tags');
    }

    public getByGivenIds(payload): Promise<Tags[] | undefined> {
        return getConnection().createQueryBuilder(Tags, "t")
            .select('t.tags')
            .where("t.id in (:ids)", { ids: [...payload] })
            .getMany();
    }
}

