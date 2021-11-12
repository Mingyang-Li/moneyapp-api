import { GqlAuthGuard } from './GqlAuth.guard';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
