import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { IncomeRow, ExpenseRow } from './notion.entity';
import { NotionService } from './notion.service';

@Resolver(() => IncomeRow)
export class NotionResolver {
  constructor(private notionService: NotionService) {}

  @Query(() => [IncomeRow])
  income(): Promise<IncomeRow[]> {
    return this.notionService.findAllIncome();
  }

  @Query(() => [ExpenseRow])
  async expense(
    @Args('id', { type: () => Int, nullable: true }) id: number,
    @Args('date', { type: () => Date, nullable: true }) date: Date,
    @Args('amount', { type: () => Int, nullable: true }) amount: number,
    @Args('currency', { type: () => String, nullable: true }) currency: string,
    @Args('item', { type: () => String, nullable: true }) item: string,
    @Args('type', { type: () => String, nullable: true }) type: string,
    @Args('subType', { type: () => String, nullable: true }) subType: string,
    @Args('paymentType', { type: () => String, nullable: true })
    paymentType: string,
  ): Promise<ExpenseRow[]> {
    return await this.notionService.findAllExpenses({
      id,
      date,
      amount,
      currency,
      item,
      type,
      subType,
      paymentType,
    });
  }
}
