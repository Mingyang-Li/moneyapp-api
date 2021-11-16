import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlAuth0Service {
  constructor(private jwtService: JwtService) {}
  public authenticateUser(token: string): boolean {
    console.log(token);
    return true;
  }
}
