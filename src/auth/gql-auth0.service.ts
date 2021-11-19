import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class GqlAuth0Service {
  constructor(private readonly jwtService: JwtService) {}

  public async validateToken(token: string) {
    // const decoded = jwt.verify(token, process.env.AUTH0_CLIENT_SECRET);
    // console.log(decoded);

    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    // const token = auth.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      console.log(`Decoded: ${decoded}`);
      if (decoded) {
        return true;
      }
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
