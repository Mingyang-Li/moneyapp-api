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
  orderBy?: orderByType;
}

export interface ExpenseQueryParams {
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
}

export interface orderByType {
  DATE_ASC;
  DATE_DESC;
}
