import { ObjectType, Field } from '@nestjs/graphql';

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

export class BaseAverage {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
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
