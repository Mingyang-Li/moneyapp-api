import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    // _Authentication_ is actually already handled for us by Auth0, so here we now just pipe through the validated token payload.
    // In this Auth0 pattern, Authentication happens between Auth0 and the Frontend.  Frontend now sends the token, that is validated by jwks-rsa.
    // Now that we know who the user is, it is the server's responsibility to take care of _Authorization_

    /** From the Tutorial
     * ===================
     * By the time your application calls validate(), Auth0 has already determined the identity of the logged-in user and passes data about that user within the payload object.
     */

    /**
    Shape of payload is:

    {
      'https://nestjs-api.com/email': 'vandenbosch.dylan1@gmail.com',
      'https://nestjs-api.com/firstname': 'Dylan',
      'https://nestjs-api.com/lastname': 'van den Bosch',
      iss: 'https://nestjs-prisma.eu.auth0.com/',
      sub: 'google-oauth2|108754556378795682719',
      aud: [
        'https://nestjs-api.com',
        'https://nestjs-prisma.eu.auth0.com/userinfo'
      ],
      iat: 1585127316,
      exp: 1585213716,
      azp: 'ubyRjuA2Kxjtf7PYgiilKL6OtoFSZM4X',
      scope: 'openid profile email'
    }
    */
    // TODO move renameKeys function out of here.
    // QUESTION where is the right place to put helper functions like these?  Are they all services, even for array/object manipulation?
    // Rename object keys "from": "to".  Thanks: https://medium.com/free-code-camp/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
    const renameKeys = (keysMap, obj) => {
      debugger;
      return Object.keys(obj).reduce((acc, key) => {
        debugger;
        const renamedObject = {
          [keysMap[key] || key]: obj[key],
        };
        debugger;
        return {
          ...acc,
          ...renamedObject,
        };
      }, {});
    };
    // Get rid of Auth0 namespacings on the claims, that come via the Auth0 middleware rule.
    payload = renameKeys(
      {
        [`${process.env.AUTH0_AUDIENCE}/email`]: 'email',
        [`${process.env.AUTH0_AUDIENCE}/firstname`]: 'firstname',
        [`${process.env.AUTH0_AUDIENCE}/lastname`]: 'lastname',
      },
      payload,
    );
    console.log('JwtStrategy -> validate -> payload', payload);
    console.log(process.env.AUTH0_AUDIENCE);
    // Check if we have this user's email on record
    const user = await this.authService.findUserByEmail(payload.email);
    console.log('JwtStrategy -> validate -> user', user);
    // If not, create a user
    if (!user) {
      const newUser = await this.authService.createUser(payload);
      console.log('JwtStrategy -> validate -> newUser', newUser);
      return newUser;
    }
    return user;
  }
}
