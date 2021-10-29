import { Currency } from './notion.entity';

export interface IncomeRow {
  date?: Date;
  amount?: number;
  currency?: Currency;
  paymentMethod?: string;
  paidBy?: string;
  incomeType?: string;
}

export interface ExpensesRow {
  date?: Date;
  amount?: number;
  currency?: Currency;
  item?: string;
  type?: string;
  subType?: string;
  paymentType?: string;
}
