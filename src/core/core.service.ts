import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NgException } from './exception/ng-exception';

@Injectable()
export class CoreService {
  constructor(private jwtService: JwtService) {}

  private isAuthenticated(
    token: string,
    errTitle: string,
    errMsg: string,
  ): UnauthorizedException | void {
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new NgException(UnauthorizedException, errMsg, errTitle).exception;
    }
  }

  public authorize(req, title, errorMsg): UnauthorizedException | void {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new NgException(UnauthorizedException, errorMsg, title).exception;

      const splitted = authorization.split(' ');

      const { ...tokenArr } = splitted;

      this.isAuthenticated(tokenArr[1], title, errorMsg);
    } catch (error) {
      throw error;
    }
  }
}
