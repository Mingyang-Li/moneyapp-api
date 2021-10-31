import { Injectable } from '@nestjs/common';
import { ExpenseRow, IncomeRow } from './notion.entity';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class NotionService {
  private notionClient = new Client({ auth: process.env.NOTION_TOKEN });
  private notionIncomeDbId = process.env.NOTION_INCOME_DATABASE_ID;
  private notionExpensesDbId = process.env.NOTION_EXPENSES_DATABASE_ID;
  private notionCrmDbId = process.env.NOTION_CRM_DATABASE_ID;

  async findAllIncome(): Promise<IncomeRow[]> {
    const response = await this.notionClient.databases.query({
      database_id: this.notionIncomeDbId,
    });
    const income = [];
    response.results.forEach((row) => {
      const incomeRow = new IncomeRow();
      // incomeRow.paymentMethod = row.properties['Payment Method']['select'].name;
      incomeRow.amount = row.properties['Amount']['number'];
      // incomeRow.incomeType = row.properties['Income Type']['select'].name;
      // incomeRow.date = new Date(row.properties['Date']['date']['start']);
      // incomeRow.currency = row.properties['Currency']['select'].name;
      income.push(incomeRow);
    });
    // console.log(response);
    return income;
  }

  async findAllExpenses(): Promise<ExpenseRow[]> {
    let cursor = undefined;
    const expenses = [];
    while (true) {
      const { results, next_cursor } = await this.notionClient.databases.query({
        database_id: this.notionExpensesDbId,
        start_cursor: cursor,
      });
      // console.log(results);
      results.forEach((row) => {
        // console.log(row.properties);
        const expenseRow: ExpenseRow = new ExpenseRow();
        expenseRow.type = row.properties['Type']['select'].name;
        expenseRow.subType = row.properties['Sub-type']['select'].name;
        expenseRow.amount = row.properties['Amount']['number'];
        expenseRow.date = new Date(row.properties['Date']['date']['start']);
        expenseRow.item = row.properties['Item']['title'][0].plain_text;
        expenses.push(expenseRow);
        // console.log(typeof expensesRow.item);
      });
      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }
    // console.log(expenses);
    console.log(expenses.length);
    return expenses;
  }
}
