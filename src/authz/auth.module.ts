import { GqlAuthGuard } from './GqlAuth.guard';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, GqlAuthGuard, AuthService],
  exports: [GqlAuthGuard, AuthService],
})
export class AuthModule {}
