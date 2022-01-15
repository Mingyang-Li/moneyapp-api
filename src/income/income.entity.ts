import { AverageIncomeExpensesType } from '@/shared/shared.dto';
import {
  BaseAverage,
  BaseGroupByQueryReturnedFields,
  BaseIncomeAndExpenseRow,
} from '@/shared/shared.entity';
import { ObjectType, Field } from '@nestjs/graphql';

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
export class AverageIncome extends BaseAverage {
  @Field()
  type: AverageIncomeExpensesType;

  @Field()
  average: number;
}
