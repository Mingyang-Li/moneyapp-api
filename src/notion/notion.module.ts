import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionResolver } from './notion.resolver';
import { GqlAuth0Module } from '@/auth/gql-auth0.module';

@Module({
  imports: [NotionModule, GqlAuth0Module],
  providers: [NotionService, NotionResolver],
})
export class NotionModule {}
