import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeRow {
  @Field()
  paymentMethod?: string;

  @Field()
  paidBy?: string;

  @Field()
  incomeType?: string;

  @Field()
  date?: Date;

  @Field()
  amount?: number;

  @Field()
  currency?: Currency;
}

@ObjectType()
export class ExpensesRow {
  @Field()
  date?: Date;

  @Field()
  item?: string;

  @Field()
  amount?: number;

  @Field()
  currency?: Currency;

  @Field()
  type?: string;

  @Field()
  subType?: string;

  @Field()
  paymentType?: string;
}

export type Currency = 'NZD' | 'USD';
