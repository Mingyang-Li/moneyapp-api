import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { AverageIncomeExpensesType } from './notion.dto';

@ObjectType()
export class BaseIncomeAndExpenseRow {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  notionId?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  dateCreated?: Date;

  @Field({ nullable: true })
  dateLastUpdated?: Date;

  @Field({ nullable: true })
  dateDeleted?: Date;

  @Field({ nullable: true })
  deleted?: boolean;
}

@ObjectType()
export class IncomeRow extends BaseIncomeAndExpenseRow {
  @Field({ nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  paidBy?: string;

  @Field({ nullable: true })
  incomeType?: string;
}

@ObjectType()
export class ExpenseRow extends BaseIncomeAndExpenseRow {
  @Field({ nullable: true })
  item?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  subType?: string;

  @Field({ nullable: true })
  paymentType?: string;
}

@ObjectType()
export class BaseGroupByQueryReturnedFields {
  // global_group_by_category
  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  dateCreated?: string;

  @Field({ nullable: true })
  dateLastUpdated?: string;

  @Field({ nullable: true })
  dateDeleted?: string;

  @Field({ nullable: true })
  deleted?: string;

  // date_filters_inputted_by_user
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  // aggregated_value_types
  @Field({ nullable: true })
  sum?: number;

  @Field({ nullable: true })
  count?: number;
}

@ObjectType()
export class IncomeGroupByQuery extends BaseGroupByQueryReturnedFields {
  // income_specific
  @Field({ nullable: true })
  incomePaidBy?: string;

  @Field({ nullable: true })
  incomePaymentMethod?: string;

  @Field({ nullable: true })
  incomeType?: string;
}

@ObjectType()
export class ExpenseGroupByQuery extends BaseGroupByQueryReturnedFields {
  // expense_specific
  @Field({ nullable: true })
  expenseType?: string;

  @Field({ nullable: true })
  expenseSubType?: string;

  @Field({ nullable: true })
  expensePaymentType?: string;
}

export class BaseAverage {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

@ObjectType()
export class AverageIncome extends BaseAverage {
  @Field()
  type: AverageIncomeExpensesType;

  @Field()
  average: number;
}

@ObjectType()
export class AverageExpenses extends BaseAverage {
  @Field()
  average: number;
}

export class BaseSum {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

@ObjectType()
export class TotalIncomeAndExpenses extends BaseSum {
  @Field()
  sum: number;
}

export const OverallUnion = createUnionType({
  name: 'ResultUnion',
  types: () => [
    IncomeRow,
    ExpenseRow,
    IncomeGroupByQuery,
    ExpenseGroupByQuery,
    AverageIncome,
    TotalIncomeAndExpenses,
  ],
});
