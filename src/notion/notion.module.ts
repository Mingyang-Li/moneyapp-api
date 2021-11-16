import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionResolver } from './notion.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [NotionModule],
  providers: [NotionService, NotionResolver, JwtService],
})
export class NotionModule {
  constructor(private jwtService: JwtService) {}
}
