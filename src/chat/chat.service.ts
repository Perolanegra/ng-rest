import { Injectable } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { Chat } from './chat.entity';
import RabbitmqServer from 'src/core/rabbitmq/rabbitmq-server';

const ChatEntity: string = 'Chat';

@Injectable()
export class ChatService {
    constructor(private repository: NgRepository) { }

    public storeMany(payload: any): Promise<Chat | undefined> {
        return this.repository.storeMany(ChatEntity, payload, 'Não foi possível persistir as mensagens. Tente novamente.');
    }

    public async getMessages() {
        const server = new RabbitmqServer(process.env.RABBITMQ_SERVER);
        await server.start();
        await server.consume(process.env.RABBITMQ_QUEUE, message =>
            console.log(message.content.toString()),
        );
    }
}
