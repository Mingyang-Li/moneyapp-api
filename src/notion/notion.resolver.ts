import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  IncomeRow,
  ExpenseRow,
  IncomeGroupByQuery,
  OverallUnion,
  AverageIncome,
  TotalIncomeAndExpenses,
} from './notion.entity';
import { NotionService } from './notion.service';
import {
  AverageIncomeExpensesType,
  IncomeQueryParams,
  OrderByType,
  ValueType,
} from './notion.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuth0Guard } from '@/auth/gql-auth0.guard';
import { getMissingDate } from '../util/getMissingDates';
import { getNumberOfDaysBetween } from '@/util/getNumberOfDaysBetween';

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
    switch (valueType) {
      case 'sum':
        if (field === 'date') {
          // need to populate arr with dates where income is $0 between 1st and last item
          // try this: https://gist.github.com/miguelmota/7905510
          // const dates = dbGroupedIncome.map((data) => data.date.toISOString());
          // const start = new Date(dateStartInc);
          // const end = new Date(dateEndInc);

          // get all dates from start to end inclusive
          const allDates = getMissingDate(dateStartInc, dateEndInc);

          // use separate array for data validation
          const datesWithIncome = dbGroupedIncome.map((income) =>
            income.date.toISOString(),
          );

          // modifying db response for easier data access & modelling
          const allIncome = dbGroupedIncome.map((income) => {
            return {
              date: income.date.toISOString(),
              sum: income._sum.amount,
            };
          });

          // Start populating return data
          const incomeSumByDate: IncomeGroupByQuery[] = [];
          allDates.forEach((dateStr: string) => {
            if (datesWithIncome.includes(dateStr)) {
              // only calculate daily amount if date has income
              // accumulate all income of that date
              let dailyAmount = 0;
              allIncome.forEach((income) => {
                if (income.date === dateStr) {
                  dailyAmount += income.sum;
                }
              });
              incomeSumByDate.push({
                date: dateStr,
                sum: dailyAmount,
              });
            } else {
              incomeSumByDate.push({
                date: dateStr,
                sum: 0,
              });
            }
          });
          return incomeSumByDate;
        } else {
          const groupedIncomeReturnSum: IncomeGroupByQuery[] =
            dbGroupedIncome.map((income) => {
              return {
                incomePaidBy: income.paidBy,
                incomePaymentMethod: income.paymentMethod,
                incomeType: income.incomeType,
                currency: income.currency,
                dateStartInc: dateStartInc,
                dateEndInc: dateEndInc,
                sum: income._sum.amount.toFixed(2),
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

  @Query(() => [AverageIncome])
  @UseGuards(GqlAuth0Guard)
  protected async averageIncome(
    @Args('type', { type: () => String })
    type: AverageIncomeExpensesType,

    @Args('dateStartInc', { type: () => Date })
    dateStartInc: Date,

    @Args('dateEndInc', { type: () => Date })
    dateEndInc: Date,
  ) {
    const income = await this.notionService.incomeByDateRange({
      type,
      dateStartInc,
      dateEndInc,
    });
    switch (type) {
      case 'daily':
        // 1. Calculate number of days between start and end date
        // 2. Calculate daily avg, return to 2 decimla places
        // 3. Return result as {}
        const days = getNumberOfDaysBetween(dateStartInc, dateEndInc);
        let amount = 0;
        income.forEach((income) => (amount += income.amount));
        const avg = (amount / days).toFixed(2);
        return [
          {
            type: 'daily',
            average: avg,
          },
        ];
      case 'monthly':
        console.log(income);
      case 'weekly':
        console.log(dateEndInc);
    }
    return [];
  }

  @Query(() => [TotalIncomeAndExpenses])
  @UseGuards(GqlAuth0Guard)
  protected async incomeSum(
    @Args('startDate', { type: () => Date, nullable: true })
    startDate: Date,

    @Args('endDate', { type: () => Date, nullable: true })
    endDate: Date,
  ) {
    const res = await this.notionService.incomeSumByDateRange({
      startDate,
      endDate,
    });
    console.log(res._sum.amount);
    return [
      {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        sum: res._sum.amount,
      },
    ];
  }
}
