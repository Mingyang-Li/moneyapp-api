import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
import { GqlAuth0Service } from './gql-auth0.service';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class GqlAuth0Guard implements CanActivate {
  constructor(private readonly gqlAuth0Service: GqlAuth0Service) {}
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    // Auth scenario checks:
    // 1. If no auth header => UNAUTHENTICATED (done)
    // 2. If JWT token is malformed or invalid => UNAUTHENTICATED (in progress)
    // 3. If token has valid fornat BUT any of extracted audience OR issuer does not equal to ones specified in env => UNAUTHENTICATED
    // 4. If token has valid fornat BUT permissions scope from decoded JWT token doesn't have admin scopes => UNAUTHORISED
    const authHeader = ctx.headers.authorization;

    // Scenario 1 check
    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    // Scenario 2, 3, 4 checks
    ctx.user = this.gqlAuth0Service.validateToken(token);
    return true;
  }
}
