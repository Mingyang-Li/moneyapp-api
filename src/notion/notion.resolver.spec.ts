import { Test, TestingModule } from '@nestjs/testing';
import { NotionResolver } from './notion.resolver';
import { NotionService } from './notion.service';

describe('NotionResolver', () => {
  let resolver: NotionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotionResolver, NotionService],
    }).compile();

    resolver = module.get<NotionResolver>(NotionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
