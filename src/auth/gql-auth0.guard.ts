import {
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class GqlAuth0Guard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    // Auth checks:
    // 1. If no auth header => UNAUTHENTICATED
    // 2. If JWT token is malformed or invalid => UNAUTHENTICATED
    // 3. If token has valid fornat BUT any of extracted audience OR issuer does not equal to ones specified in env => UNAUTHENTICATED
    // 4. If token has valid fornat BUT permissions scope from decoded JWT token doesn't have admin scopes => UNAUTHORISED
    const authHeader = ctx.headers.authorization;
    if (!authHeader) {
      return false;
    }
    ctx.user = this.validateToken(authHeader);
    return true;
  }

  protected async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
