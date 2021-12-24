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
    // console.table(dbGroupedIncome);
    switch (valueType) {
      case 'sum':
        if (field === 'date') {
          // need to populate arr with dates where income is $0 between 1st and last item
          // try this: https://gist.github.com/miguelmota/7905510
          // const dates = dbGroupedIncome.map((data) => data.date.toISOString());
          // const start = new Date(dateStartInc);
          // const end = new Date(dateEndInc);

          // get all dates from start to end inclusive
          const allDates: string[] = getMissingDate(dateStartInc, dateEndInc);

          // use separate array for data validation
          const allDatesWithIncome: string[] = dbGroupedIncome.map((income) =>
            income.date.toISOString(),
          );
          console.table(allDatesWithIncome);

          // modifying db response for easier data access & modelling
          const allIncome: IncomeGroupByQuery[] = dbGroupedIncome.map(
            (income) => {
              return {
                date: income.date.toISOString(),
                sum: income._sum.amount,
              };
            },
          );

          // for (let i = 0; i < allDatesWithIncome.length; i++) {
          //   if (allDatesWithIncome[i] === allIncome[i].date) {
          //     console.log(`date match, income: $ ${allIncome[i].sum}`);
          //   }
          // }

          let ct = 0;
          // Start populating return data
          const res: IncomeGroupByQuery[] = [];
          for (let i = 0; i < allDates.length; i++) {
            const currDate = allDates[i];
            const incomeIndex = allDatesWithIncome.indexOf(currDate);
            const hasIncome = allDatesWithIncome.includes(currDate);
            if (hasIncome) {
              ct += 1;
            }
            // if (currDate === allIncome[incomeIndex]?.date) {
            //   console.log(
            //     `date match, income: $ ${allIncome[incomeIndex].sum}`,
            //   );
            // }
            // if (incomeIndex === -1) {
            //   res.push({ date: currDate, sum: 0 });
            // } else {
            //   const currIncome = allIncome[incomeIndex];
            //   res.push({ date: currDate, sum: currIncome.sum });
            // }
          }
          console.log(ct);

          // console.table(res);
          // console.log(`num dates with income: ${allIncome.length}`);
          // let ct = 0;
          // res.forEach((r) => {
          //   if (r.sum !== 0) {
          //     ct += 1;
          //   }
          // });
          // console.log(`calculated num dates with income: ${ct}`);
          return res;
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
        sum: res._sum.amount.toFixed(2),
      },
    ];
  }

  @Query(() => [TotalIncomeAndExpenses])
  @UseGuards(GqlAuth0Guard)
  protected async expenseSum(
    @Args('startDate', { type: () => Date, nullable: true })
    startDate: Date,

    @Args('endDate', { type: () => Date, nullable: true })
    endDate: Date,
  ) {
    const res = await this.notionService.expenseSumByDateRange({
      startDate,
      endDate,
    });
    console.log(res._sum.amount);
    return [
      {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        sum: res._sum.amount.toFixed(2),
      },
    ];
  }
}
