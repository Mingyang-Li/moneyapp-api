import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionResolver } from './notion.resolver';
import { AuthzModule } from '@/authz/authz.module';

@Module({
  imports: [AuthzModule],
  providers: [NotionService, NotionResolver],
})
export class NotionModule {}
