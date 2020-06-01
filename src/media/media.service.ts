import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
    
    constructor(private repository: NgRepository) {}

    public store(payload: any):  Promise<Media[] | undefined> {
        return this.repository.store('Media', payload, 'Não foi possível inserir a mídia. Tente novamente.');
    }

}
