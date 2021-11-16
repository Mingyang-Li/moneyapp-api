import { Module } from '@nestjs/common';
import { GqlAuth0Service } from './gql-auth0.service';

@Module({
  providers: [GqlAuth0Service],
  exports: [GqlAuth0Service],
})
export class GqlAuth0Module {}
