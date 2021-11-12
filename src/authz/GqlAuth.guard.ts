import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    // Get the header
    const authHeader = context.getArgs()[2].req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }
    const validationResult = this.auth.ValidateToken(token);
    if (validationResult === true) {
      return true;
    }
    throw new UnauthorizedException(validationResult);
  }
}
