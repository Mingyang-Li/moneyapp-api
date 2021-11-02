export interface IncomeQueryParams {
  id?: number;
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
}

export interface ExpenseQueryParams {
  id?: number;
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
