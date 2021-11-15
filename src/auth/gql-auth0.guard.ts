import {
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import * as dotenv from 'dotenv';
import jwksRsa from 'jwks-rsa';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class GqlAuth0Guard implements CanActivate {
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    // const tempToken = jwt.verify(
    //   'eyJhbGciOiJIUzI1NiJ9.dGVzdA.Z9QppyGaeY_EPcKk_srfzkntr319UZd97HOhhOmjEcc',
    //   'secret',
    // );
    // console.log(`✨ ${tempToken}`);
    ctx.user = this.validateToken(ctx.headers.authorization);
    return true;
  }

  protected async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    // const token = auth.split(' ')[1];

    const checkJwt = jwt({
      // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      // Validate the audience and the issuer
      audience: `${process.env.AUTH0_AUDIENCE}`, //replace with your API's audience, available at Dashboard > APIs
      issuer: `${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    });

    console.log(checkJwt);

    try {
      const decoded = true;
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  protected async isAdmin(token: string): Promise<boolean> {
    console.log(token);
    const scopes = jwtAuthz(['crud:all']);
    console.log(`✨ ${scopes}`);
    return true;
  }
}
