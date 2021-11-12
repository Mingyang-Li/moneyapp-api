import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

const secret = 'GRAPHQL_CONFERENCE_SECRET';
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([request]));
  }

  isValidToken(token: string) {
    try {
      const result: any = jwt.verify(token, secret);
      console.log(result);
      return result.auth === true;
    } catch (err) {
      return false;
    }
  }
}
