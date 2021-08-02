import { Logger } from '@nestjs/common';

export class NgException {
  private readonly logger = new Logger(NgException.name);
  public exception: any;

  constructor(exceptionType: any, msg: string, title: string, exception?: any) {
    this.exception = new exceptionType(msg);
    this.exception.name = title;
    if (exception) {
      this.logger.log(`Exception: ${exception}`);
    }
  }
}
