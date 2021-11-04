import { Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class GroupByQuery {
  // income_specific
  @Field({ nullable: true })
  incomePaidBy?: string;

  @Field({ nullable: true })
  incomePaymentMethod?: string;

  @Field({ nullable: true })
  incomeType?: string;

  // expense_specific
  @Field({ nullable: true })
  expenseType?: string;

  @Field({ nullable: true })
  expenseSubType?: string;

  @Field({ nullable: true })
  expensePaymentType?: string;

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

  // aggregated_value_types
  @Field({ nullable: true })
  sum?: number;

  @Field({ nullable: true })
  average?: number;

  @Field({ nullable: true })
  count?: number;
}

// sample_responses
export const incomePaidBy = [
  {
    incomePaidBy: 'google',
    sum: 200000,
  },
  {
    incomePaidBy: 'amazon',
    sum: 100000,
  },
  {
    incomePaidBy: 'netflix',
    sum: 232000,
  },
  {
    incomePaidBy: 'microsoft',
    sum: 190280,
  },
  {
    incomePaidBy: 'metaverse',
    sum: 190280,
  },
];

export const incomeByPaymentMethod = [
  {
    incomePaymentMethod: 'cash',
    currency: 'NZD',
    sum: 2670000,
  },
  {
    incomePaymentMethod: 'stripe',
    currency: 'USD',
    sum: 108000,
  },
  {
    incomePaymentMethod: 'bitcoin',
    currency: 'BTC',
    sum: 232000,
  },
];

export const incomeType = [
  {
    incomeType: 'commission',
    sum: 2670000,
  },
  {
    incomeType: 'wage',
    sum: 108000,
  },
  {
    incomeType: 'investment cashout',
    sum: 232000,
  },
];

export const expenseType = [
  {
    expenseType: 'transport',
    sum: 1000,
  },
  {
    expenseType: 'sports',
    sum: 5000,
  },
  {
    expenseType: 'bills',
    sum: 900,
  },
];

export const expenseSubType = [
  {
    expenseSubType: 'food',
    sum: 1000,
  },
  {
    expenseSubType: 'running gears',
    sum: 5000,
  },
  {
    expenseSubType: 'pc accessories',
    sum: 900,
  },
];

export const expensePaymentType = [
  {
    expensePaymentType: 'cash',
    sum: 100000,
    currency: 'NZD',
  },
  {
    expensePaymentType: 'credit card',
    sum: 100000,
    currency: 'USD',
  },
  {
    expensePaymentType: 'bitcoin',
    sum: 100000,
    currency: 'BTC',
  },
];

export const incomeByCurrency = [
  {
    currency: 'NZD',
    sum: 100000,
  },
  {
    currency: 'USD',
    sum: 100000,
  },
  {
    currency: 'DOT',
    sum: 100000,
  },
];
