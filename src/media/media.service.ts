import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Media } from './media.entity';

const MediaEntity: string = 'Media';

@Injectable()
export class MediaService {
    
    constructor(private repository: NgRepository) {}

    public store(payload: any):  Promise<Media | undefined> {
        return this.repository.store(MediaEntity, payload, 'Não foi possível inserir a mídia. Tente novamente.');
    }

}
