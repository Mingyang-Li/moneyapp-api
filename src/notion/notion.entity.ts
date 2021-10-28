import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeRow {
  @Field()
  id: string;
}
