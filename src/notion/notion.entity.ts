import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeRow {
  @Field()
  id: number;

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
}
