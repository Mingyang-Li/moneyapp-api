export interface IncomeQueryParams extends BaseQueryParam {
  // dataAttributes
  paymentMethod?: string;
  paidBy?: string;
  incomeType?: string;
}

export interface ExpenseQueryParams extends BaseQueryParam {
  // dataAttributes
  item?: string;
  type?: string;
  subType?: string;
  paymentType?: string;
}

export interface BaseQueryParam {
  id?: number;
  notionId?: string;
  amount?: number;
  currency?: string;
  date?: Date;
  dateCreated?: Date;
  dateLastUpdated?: Date;
  dateDeleted?: Date;
  deleted?: boolean;

  // functionAttributes
  sortDateBy?: OrderByType;
  count?: number;
}

export type OrderByType = 'asc' | 'desc';

export interface BaseGroupingType {
  currency?: 'currency';
  date?: 'date';
  dateCreated?: 'dateCreated';
  dateLastUpdated?: 'dateLastUpdated';
  dateDeleted?: 'dateDeleted';
  deleted?: 'delated';
}

export interface IncomeGroupingType extends BaseGroupingType {
  paymentMethod?: 'paymentMethod';
  paidBy?: 'paidBy';
  incomeType?: 'incomeType';
}

export interface ExpenseGroupingType extends BaseGroupingType {
  type?: 'type';
  subType?: 'subType';
  paymentType?: 'paymentType';
}

export type ValueType = 'count' | 'sum' | 'average';

export type TableType = 'Income' | 'Expense';

export interface GroupQueryParam {
  table: TableType;
  categoryType: GroupByQueryReturnField;
  valueType: ValueType;
  dateStartInc?: Date;
  dateEndInc?: Date;
}

export type GroupByQueryReturnField =
  | 'incomePaidBy'
  | 'incomePaymentMethod'
  | 'incomeType'
  | 'expenseType'
  | 'expenseSubType'
  | 'expensePaymentType'

  // global global_group_by_fields fields
  | 'currency'
  | 'date'
  | 'dateCreated'
  | 'dateLastUpdated'
  | 'dateDeleted'
  | 'deleted';
