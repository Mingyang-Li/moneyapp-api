import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeRow {
  @Field()
  paymentMethod?: string;

  @Field()
  paidBy?: string;

  @Field()
  incomeType?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field()
  amount?: number;

  @Field()
  currency?: string;
}

@ObjectType()
export class ExpensesRow {
  @Field({ nullable: true })
  date?: Date;

  @Field()
  item?: string;

  @Field()
  amount?: number;

  @Field()
  currency?: string;

  @Field()
  type?: string;

  @Field()
  subType?: string;

  @Field()
  paymentType?: string;
}
