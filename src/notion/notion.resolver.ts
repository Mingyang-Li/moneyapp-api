import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { IncomeRow, ExpenseRow } from './notion.entity';
import { NotionService } from './notion.service';
import { OrderByType } from './notion.dto';

@Resolver(() => [])
export class NotionResolver {
  constructor(private notionService: NotionService) {}

  @Query(() => [IncomeRow])
  async income(
    @Args('paymentMethod', { type: () => String, nullable: true })
    paymentMethod: string,
    @Args('paidBy', { type: () => String, nullable: true }) paidBy: string,
    @Args('incomeType', { type: () => String, nullable: true })
    incomeType: string,
    @Args('date', { type: () => Date, nullable: true }) date: Date,
    @Args('currency', { type: () => String, nullable: true }) currency: string,
    @Args('sortDateBy', { type: () => String, nullable: true })
    sortDateBy: OrderByType,
  ): Promise<IncomeRow[]> {
    return this.notionService.findAllIncome({
      paymentMethod,
      paidBy,
      incomeType,
      date,
      currency,
      sortDateBy,
    });
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
    @Args('sortDateBy', { type: () => String, nullable: true })
    sortDateBy: OrderByType,
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
      sortDateBy,
    });
  }
}
