export interface IncomeQueryParams {
  // dataAttributes
  id?: number;
  notionId?: string;
  date?: Date;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paidBy?: string;
  incomeType?: string;
  dateCreated?: Date;
  dateLastUpdated?: Date;
  dateDeleted?: Date;
  delated?: boolean;

  // functionAttributes
  sortDateBy?: OrderByType;
}

export interface ExpenseQueryParams {
  // dataAttributes
  id?: number;
  notionId?: string;
  date?: Date;
  amount?: number;
  currency?: string;
  item?: string;
  type?: string;
  subType?: string;
  paymentType?: string;
  dateCreated?: Date;
  dateLastUpdated?: Date;
  dateDeleted?: Date;
  delated?: boolean;

  // functionAttributes
  sortDateBy?: OrderByType;
}

export type OrderByType = 'asc' | 'desc';

// export interface OrderByFields {
//   // common
//   id: 'id';
//   notionId: 'notionId';
//   date: 'date';
//   amount: 'amount';
//   currency: 'currency';

//   // income_only
//   paymentMethod: 'paymentMethod';
//   paidBy: 'paidBy';
//   incomeType: 'incomeType';

//   // expense_only;
//   item: 'item';
//   type: 'type';
//   subTyoe: 'subType';
//   paymentType: 'paymentType';

//   // db_specific
//   dateCreated: 'dateCreated';
//   dateLastUpdated: 'dateLastUpdated';
//   dateDeleted: 'dateDeleted';
//   deleted: 'deleted';
// }
