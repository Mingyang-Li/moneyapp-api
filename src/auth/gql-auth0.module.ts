import { Module } from '@nestjs/common';

@Module({
  exports: [GqlAuth0Module],
})
export class GqlAuth0Module {}
