import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'api ng-rest is working on port 3000!';
  }
}
