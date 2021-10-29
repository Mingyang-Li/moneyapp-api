import { Injectable } from '@nestjs/common';
import { ExpensesRow, IncomeRow } from './notion.entity';
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
      console.log(row.properties);
      const incomeRow = new IncomeRow();
      incomeRow.paymentMethod = row.properties['Payment Method']['select'].name;
      incomeRow.amount = row.properties['Amount']['number'];
      incomeRow.incomeType = row.properties['Income Type']['select'].name;
      incomeRow.date = row.properties['Date']['date']['start'];
      // incomeRow.currency = row.properties['Currency']['select'].name
      //   ? row.properties['Currency']['select'].name
      //   : 'NZD';
      income.push(incomeRow);
    });
    return income;
  }

  async findAllExpenses(): Promise<ExpensesRow[]> {
    const response = await this.notionClient.databases.query({
      database_id: process.env.NOTION_EXPENSES_DATABASE_ID,
    });

    const expenses = [];
    response.results.forEach((row) => {
      // console.log(row.properties['Item']['title'][0].plain_text);
      const expensesRow = new ExpensesRow();
      expensesRow.type = row.properties['Type']['select'].name;
      expensesRow.subType = row.properties['Sub-type']['select'].name;
      expensesRow.amount = row.properties['Amount']['number'];
      expensesRow.date = row.properties['Date']['date']['start'];
      expensesRow.item = row.properties['Item']['title'][0].plain_text;
      expenses.push(expensesRow);
    });
    console.table(expenses);
    return expenses;
  }
}
