import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  IncomeRow,
  ExpenseRow,
  IncomeGroupByQuery,
  OverallUnion,
  AverageIncome,
  TotalIncomeAndExpenses,
  ExpenseGroupByQuery,
} from './notion.entity';
import { NotionService } from './notion.service';
import {
  AverageIncomeExpensesType,
  ExpenseQueryParams,
  IncomeQueryParams,
  OrderByType,
  ValueType,
} from './notion.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuth0Guard } from '@/auth/gql-auth0.guard';
import { SharedService } from '@/shared/shared.service';

@Resolver(() => [OverallUnion])
export class NotionResolver {
  private notionService: NotionService;
  private sharedService: SharedService;

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

    @Args('startDate', { type: () => Date, nullable: true })
    startDate: Date,

    @Args('endDate', { type: () => Date, nullable: true })
    endDate: Date,
  ) {
    const dbGroupedIncome = await this.notionService.incomeQueryByGroup({
      field,
      valueType,
      startDate,
      endDate,
    });
    // console.table(dbGroupedIncome);
    switch (valueType) {
      case 'sum':
        if (field === 'date') {
          // need to populate arr with dates where income is $0 between 1st and last item
          // try this: https://gist.github.com/miguelmota/7905510
          // no matter what datetime comex from frontend, always convert thenm to midnight time
          const start = new Date(startDate.setHours(12, 0, 0));
          const end = new Date(endDate.setHours(12, 0, 0));

          // get all dates from start to end inclusive
          const allDates: string[] = this.sharedService.getMissingDate(
            start,
            end,
          );

          // use separate array for data validation
          const allDatesWithIncome: string[] = dbGroupedIncome.map((income) =>
            income.date.toISOString(),
          );
          // console.table(allDatesWithIncome);

          // modifying db response for easier data access & modelling
          const allIncome: IncomeGroupByQuery[] = dbGroupedIncome.map(
            (income) => {
              return {
                date: income.date.toISOString(),
                sum: income._sum.amount,
              };
            },
          );

          // Start populating return data
          const res: IncomeGroupByQuery[] = [];
          for (let i = 0; i < allDates.length; i++) {
            const currDate = allDates[i];
            const incomeIndex = allDatesWithIncome.indexOf(currDate);
            const hasIncome = allDatesWithIncome.includes(currDate);
            if (hasIncome) {
              res.push({ date: currDate, sum: allIncome[incomeIndex].sum });
            } else {
              res.push({ date: currDate, sum: 0 });
            }
          }

          return res;
        } else {
          const groupedIncomeReturnSum: IncomeGroupByQuery[] =
            dbGroupedIncome.map((income) => {
              return {
                incomePaidBy: income.paidBy,
                incomePaymentMethod: income.paymentMethod,
                incomeType: income.incomeType,
                currency: income.currency,
                startDate: startDate,
                endDate: endDate,
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
              startDate: startDate,
              endDate: endDate,
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

  @Query(() => [ExpenseGroupByQuery])
  @UseGuards(GqlAuth0Guard)
  protected async expensesGroupBy(
    @Args('field', { type: () => String })
    field: ExpenseQueryParams,

    @Args('valueType', { type: () => String })
    valueType: ValueType,

    @Args('startDate', { type: () => Date, nullable: true })
    startDate: Date,

    @Args('endDate', { type: () => Date, nullable: true })
    endDate: Date,
  ) {
    const dbGroupedExpenses = await this.notionService.expensesQueryByGroup({
      field,
      valueType,
      startDate,
      endDate,
    });
    switch (valueType) {
      case 'sum':
        if (field === 'date') {
          // need to populate arr with dates where income is $0 between 1st and last item
          // try this: https://gist.github.com/miguelmota/7905510
          // no matter what datetime comex from frontend, always convert thenm to midnight time
          const start = new Date(startDate.setHours(12, 0, 0));
          const end = new Date(endDate.setHours(12, 0, 0));

          // get all dates from start to end inclusive
          const allDates: string[] = this.sharedService.getMissingDate(
            start,
            end,
          );

          // use separate array for data validation
          const allDatesWithExpenses: string[] = dbGroupedExpenses.map(
            (expense) => expense.date.toISOString(),
          );
          // console.table(allDatesWithIncome);

          // modifying db response for easier data access & modelling
          const allExpenses: ExpenseGroupByQuery[] = dbGroupedExpenses.map(
            (expense) => {
              return {
                date: expense.date.toISOString(),
                sum: expense._sum.amount,
              };
            },
          );

          // Start populating return data
          const res: ExpenseGroupByQuery[] = [];
          for (let i = 0; i < allDates.length; i++) {
            const currDate = allDates[i];
            const incomeIndex = allDatesWithExpenses.indexOf(currDate);
            const hasIncome = allDatesWithExpenses.includes(currDate);
            if (hasIncome) {
              res.push({ date: currDate, sum: allExpenses[incomeIndex].sum });
            } else {
              res.push({ date: currDate, sum: 0 });
            }
          }

          return res;
        } else {
          const groupedExpensesReturnSum: ExpenseGroupByQuery[] =
            dbGroupedExpenses.map((expense) => {
              return {
                expenseType: expense.type,
                expenseSubType: expense.subType,
                expensePaymentType: expense.paymentType,
                currency: expense.currency,
                startDate: startDate,
                endDate: endDate,
                sum: expense._sum.amount.toFixed(2),
              };
            });
          return groupedExpensesReturnSum;
        }
      case 'count':
        const groupedIncomeReturnCount: ExpenseGroupByQuery[] =
          dbGroupedExpenses.map((income) => {
            return {
              incomePaidBy: income.paidBy,
              incomePaymentMethod: income.paymentMethod,
              incomeType: income.incomeType,
              date: income.date.toISOString(),
              startDate: startDate,
              endDate: endDate,
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

    @Args('startDate', { type: () => Date })
    startDate: Date,

    @Args('endDate', { type: () => Date })
    endDate: Date,
  ) {
    const income = await this.notionService.incomeByDateRange({
      type,
      startDate,
      endDate,
    });
    switch (type) {
      case 'daily':
        // 1. Calculate number of days between start and end date
        // 2. Calculate daily avg, return to 2 decimla places
        // 3. Return result as {}
        const days = this.sharedService.getNumberOfDaysBetween(
          startDate,
          endDate,
        );
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
        console.log(endDate);
    }
    return [];
  }

  @Query(() => [AverageIncome])
  @UseGuards(GqlAuth0Guard)
  protected async averageExpenses(
    @Args('startDate', { type: () => Date })
    startDate: Date,

    @Args('endDate', { type: () => Date })
    endDate: Date,
  ) {
    const expenses = await this.notionService.expenseSumByDateRange({
      startDate,
      endDate,
    });
    const days = this.sharedService.getNumberOfDaysBetween(startDate, endDate);
    const amount = expenses._sum.amount;
    const average = (amount / days).toFixed(2);
    return [
      {
        average,
      },
    ];
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
  protected async netIncome(
    @Args('startDate', { type: () => Date, nullable: true })
    startDate: Date,

    @Args('endDate', { type: () => Date, nullable: true })
    endDate: Date,
  ) {
    const expenses = await this.notionService.expenseSumByDateRange({
      startDate,
      endDate,
    });
    const income = await this.notionService.incomeSumByDateRange({
      startDate,
      endDate,
    });
    const spentAmt = expenses._sum.amount;
    const earnedAmt = income._sum.amount;
    return [
      {
        sum: (earnedAmt - spentAmt).toFixed(2),
      },
    ];
  }
}
