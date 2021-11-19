import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionResolver } from './notion.resolver';

@Module({
  imports: [NotionModule],
  providers: [NotionService, NotionResolver],
})
export class NotionModule {}
