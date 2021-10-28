import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionResolver } from './notion.resolver';

@Module({
  providers: [NotionResolver, NotionService]
})
export class NotionModule {}
