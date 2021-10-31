import { Injectable } from '@nestjs/common';
import { ExpenseRow, IncomeRow } from './notion.entity';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class NotionService {
  private notionClient = new Client({ auth: process.env.NOTION_TOKEN });

  async findAllIncome(): Promise<IncomeRow[]> {
    const response = await this.notionClient.databases.query({
      database_id: process.env.NOTION_INCOME_DATABASE_ID,
    });
    const income = [];
    response.results.forEach((row) => {
      const incomeRow = new IncomeRow();
      incomeRow.paymentMethod = row.properties['Payment Method']['select'].name;
      incomeRow.amount = row.properties['Amount']['number'];
      incomeRow.incomeType = row.properties['Income Type']['select'].name;
      incomeRow.date = new Date(row.properties['Date']['date']['start']);
      incomeRow.currency = row.properties['Currency']['select'].name;
      income.push(incomeRow);
    });
    // console.table(income);
    return income;
  }

  async findAllExpenses(): Promise<ExpenseRow[]> {
    const response = await this.notionClient.databases.query({
      database_id: process.env.NOTION_EXPENSES_DATABASE_ID,
    });

    const expenses = [];
    response.results.forEach((row) => {
      const expensesRow = new ExpenseRow();
      expensesRow.type = row.properties['Type']['select'].name;
      expensesRow.subType = row.properties['Sub-type']['select'].name;
      expensesRow.amount = row.properties['Amount']['number'];
      expensesRow.date = row.properties['Date']['date']['start'];
      expensesRow.item = row.properties['Item']['title'][0].plain_text;
      expenses.push(expensesRow);
    });
    return expenses;
  }
}
