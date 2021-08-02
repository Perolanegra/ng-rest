import { HttpResponseDataDTO } from './dto/http-response-data.dto';

export class HttpResponseData {
  public readonly response: HttpResponseDataDTO;

  constructor(payload: {
    msg: string;
    title: string;
    statusCode: number;
    extras?: any;
  }) {
    this.response = {
      message: payload.msg,
      title: payload.title,
      statusCode: payload.statusCode,
      style: { posTop: '5vh' },
      type: 'success',
      payload: payload.extras,
    };
  }
}
