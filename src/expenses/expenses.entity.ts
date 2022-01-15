import {
  BaseAverage,
  BaseGroupByQueryReturnedFields,
  BaseIncomeAndExpenseRow,
} from '@/shared/shared.entity';
import { ObjectType, Field } from '@nestjs/graphql';

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
export class ExpenseGroupByQuery extends BaseGroupByQueryReturnedFields {
  // expense_specific
  @Field({ nullable: true })
  expenseType?: string;

  @Field({ nullable: true })
  expenseSubType?: string;

  @Field({ nullable: true })
  expensePaymentType?: string;
}

@ObjectType()
export class AverageExpenses extends BaseAverage {
  @Field()
  average: number;
}
