import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  itsOn(): string {
    return 'Api ng-rest is working now: ' + new Date().toLocaleString();
  }
}
