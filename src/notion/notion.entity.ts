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

  @Field({ nullable: true })
  dateCreated?: Date;

  @Field({ nullable: true })
  dateLastUpdated?: Date;

  @Field({ nullable: true })
  dateDeleted?: Date;

  @Field({ nullable: true })
  delated?: boolean;
}

@ObjectType()
export class ExpenseRow {
  @Field()
  id: number;

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

  @Field({ nullable: true })
  dateCreated?: Date;

  @Field({ nullable: true })
  dateLastUpdated?: Date;

  @Field({ nullable: true })
  dateDeleted?: Date;

  @Field({ nullable: true })
  delated?: boolean;
}
