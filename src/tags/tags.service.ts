import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { TransactionRepository, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
    constructor(
        @TransactionRepository(Tags)
        @InjectRepository(Tags)
        private tagsRespository: Repository<Tags>,
    ) {
    }

    public getAll(req): Promise<Tags[] | undefined> {
        return this.tagsRespository.find();
    }

    public getByGivenIds(payload): Promise<Tags[] | undefined> {
        return getConnection().createQueryBuilder(Tags, "t")
            .select('t.tags')
            .where("t.id in (:ids)", { ids: [...payload] })
            .getMany();
    }
}


// return this.tagsRespository.find( { retornando tudo
//     where: `id IN(${payload})` 
// });