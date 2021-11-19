import {
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class GqlAuth0Guard implements CanActivate {
  private jwt = jwt;
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    // Auth scenario checks:
    // 1. If no auth header => UNAUTHENTICATED
    // 2. If JWT token is malformed or invalid => UNAUTHENTICATED
    // 3. If token has valid fornat BUT any of extracted audience OR issuer does not equal to ones specified in env => UNAUTHENTICATED
    // 4. If token has valid fornat BUT permissions scope from decoded JWT token doesn't have admin scopes => UNAUTHORISED
    const authHeader = ctx.headers.authorization;

    // Scenario 1 check
    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    // Scenario 2, 3, 4 checks
    const toValidate = this.validateToken(token);
    return toValidate;
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwt.decode(token);
      const permission = decoded['permissions'][0];
      // console.log(`decoded.permissions: ${permission}`);
      if (permission !== process.env.AUTH0_ADMIN_PERMISSION_SCOPE) {
        // console.log('No access');
        return false;
      } else {
        // console.log('Has access');
        return true;
      }
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
