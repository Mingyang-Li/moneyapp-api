import { Test, TestingModule } from '@nestjs/testing';
import { NotionService } from './notion.service';

describe('NotionService', () => {
  let service: NotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotionService],
    }).compile();

    service = module.get<NotionService>(NotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
