import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get('/list')
    async getGeneral() {
        return this.chatService.getMessages();
    }
}
