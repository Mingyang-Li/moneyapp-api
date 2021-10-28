import { Test, TestingModule } from '@nestjs/testing';
import { NotionResolver } from './notion.resolver';

describe('NotionResolver', () => {
  let resolver: NotionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotionResolver],
    }).compile();

    resolver = module.get<NotionResolver>(NotionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
