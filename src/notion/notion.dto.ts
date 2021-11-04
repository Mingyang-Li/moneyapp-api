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
  delated?: boolean;

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
  delated?: 'delated';
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

export type ValueType = 'count' | 'sum' | 'avg';
