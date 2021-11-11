import {
  CanActivate,
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthzGuard implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
  }

  public async validateToken(authHeader: string) {
    if (authHeader.split(' ')[0] !== 'Bearer') {
      console.log(`❌ authHeader not present!`);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authHeader.split(' ')[1];
    console.log(`✔️  token: ${token}`);
    try {
      return await jwt.verify(token, 'secret');
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
