import { Field, ObjectType } from '@nestjs/graphql';
// import {
//   IncomeGroupingType,
//   ExpenseGroupingType,
//   ValueType,
// } from './notion.dto';

@ObjectType()
export class IncomeRow {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  notionId?: string;

  @Field({ nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  paidBy?: string;

  @Field({ nullable: true })
  incomeType?: string;

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
  delated?: boolean;
}

@ObjectType()
export class ExpenseRow {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  notionId?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  item?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  subType?: string;

  @Field({ nullable: true })
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

// @ObjectType()
// export class IncomeGroupByQuery {
//   @Field()
//   fieldName: IncomeGroupingType;

//   @Field()
//   value: ValueType;
// }

// @ObjectType()
// export class ExpenseGroupByQuery {
//   @Field()
//   fieldName: ExpenseGroupingType;

//   @Field()
//   value: ValueType;
// }

export const incomeBySource = [
  {
    field: 'google',
    value: 200000,
  },
  {
    field: 'amazon',
    value: 100000,
  },
  {
    field: 'netflix',
    value: 232000,
  },
  {
    field: 'microsoft',
    value: 190280,
  },
  {
    field: 'metaverse',
    value: 190280,
  },
];
