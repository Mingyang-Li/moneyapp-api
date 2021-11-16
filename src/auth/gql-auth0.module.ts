import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtService],
  providers: [JwtService],
  exports: [GqlAuth0Module],
})
export class GqlAuth0Module {}
