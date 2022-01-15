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

export interface BaseGroupingType {
  currency?: 'currency';
  deleted?: 'deleted';
}

export type OrderByType = 'asc' | 'desc';

export interface DbCount {
  _count: Field;
}

export interface Field {
  notionId?: number;
}

export type AverageIncomeExpensesType = 'daily' | 'weekly' | 'monthly';
