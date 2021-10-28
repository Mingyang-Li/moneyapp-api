import { Resolver, Query } from '@nestjs/graphql';
import { IncomeRow } from './notion.entity';
import { NotionService } from './notion.service';

@Resolver(() => IncomeRow)
export class NotionResolver {
  constructor(private notionService: NotionService) {}

  @Query(() => [IncomeRow])
  income(): Promise<IncomeRow[]> {
    return this.notionService.findAllIncome();
  }
}
