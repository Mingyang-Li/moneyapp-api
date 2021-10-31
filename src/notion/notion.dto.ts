export interface IncomeRow {
  date?: Date;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paidBy?: string;
  incomeType?: string;
}

export interface ExpenseRow {
  date?: Date;
  amount?: number;
  currency?: string;
  item?: string;
  type?: string;
  subType?: string;
  paymentType?: string;
}
