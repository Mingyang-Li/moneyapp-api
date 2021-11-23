import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  IncomeRow,
  ExpenseRow,
  IncomeGroupByQuery,
  OverallUnion,
} from './notion.entity';
import { NotionService } from './notion.service';
import { IncomeQueryParams, OrderByType, ValueType } from './notion.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuth0Guard } from '@/auth/gql-auth0.guard';

@Resolver(() => [OverallUnion])
export class NotionResolver {
  constructor(private notionService: NotionService) {}

  @Query(() => [IncomeRow])
  @UseGuards(GqlAuth0Guard)
  protected async income(
    @Args('paymentMethod', { type: () => String, nullable: true })
    paymentMethod: string,
    @Args('paidBy', { type: () => String, nullable: true }) paidBy: string,
    @Args('incomeType', { type: () => String, nullable: true })
    incomeType: string,
    @Args('date', { type: () => Date, nullable: true }) date: Date,
    @Args('currency', { type: () => String, nullable: true }) currency: string,
    @Args('sortDateBy', { type: () => String, nullable: true })
    sortDateBy: OrderByType,
    @Args('count', { type: () => Int, nullable: true }) count: number,
  ): Promise<IncomeRow[]> {
    return this.notionService.findAllIncome({
      paymentMethod,
      paidBy,
      incomeType,
      date,
      currency,
      sortDateBy,
      count,
    });
  }

  @Query(() => [ExpenseRow])
  @UseGuards(GqlAuth0Guard)
  protected async expense(
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

    @Args('count', { type: () => Int, nullable: true }) count: number,
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
      count,
    });
  }

  @Query(() => [IncomeGroupByQuery])
  @UseGuards(GqlAuth0Guard)
  protected async incomeGroupBy(
    @Args('field', { type: () => String })
    field: IncomeQueryParams,

    @Args('valueType', { type: () => String })
    valueType: ValueType,

    @Args('dateStartInc', { type: () => Date, nullable: true })
    dateStartInc: Date,

    @Args('dateEndInc', { type: () => Date, nullable: true })
    dateEndInc: Date,
  ) {
    const dbGroupedIncome = await this.notionService.incomeQueryByGroup({
      field,
      valueType,
      dateStartInc,
      dateEndInc,
    });
    console.log(dbGroupedIncome);
    switch (valueType) {
      case 'sum':
        if (field === 'date') {
          // need to populate arr with dates where income = $0 between 1st and last item
          // try this: https://www.demo2s.com/javascript/javascript-date-finding-missing-dates-within-a-date-range.html
          const incomeSumByDate: IncomeGroupByQuery[] = [];
          console.log(incomeSumByDate);
          return incomeSumByDate;
        } else {
          const groupedIncomeReturnSum: IncomeGroupByQuery[] =
            dbGroupedIncome.map((income) => {
              return {
                incomePaidBy: income.paidBy,
                incomePaymentMethod: income.paymentMethod,
                incomeType: income.incomeType,
                currency: income.currency,
                date: income.date.toISOString(),
                dateStartInc: dateStartInc,
                dateEndInc: dateEndInc,
                sum: income._sum.amount,
              };
            });
          return groupedIncomeReturnSum;
        }
      case 'count':
        const groupedIncomeReturnCount: IncomeGroupByQuery[] =
          dbGroupedIncome.map((income) => {
            return {
              incomePaidBy: income.paidBy,
              incomePaymentMethod: income.paymentMethod,
              incomeType: income.incomeType,
              date: income.date.toISOString(),
              dateStartInc: dateStartInc,
              dateEndInc: dateEndInc,
              count:
                income._count.paymentMethod |
                income._count.paidBy |
                income._count.incomeType |
                income._count.date,
            };
          });
        return groupedIncomeReturnCount;
    }
  }
}
