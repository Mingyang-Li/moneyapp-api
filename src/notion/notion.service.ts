import { Injectable } from '@nestjs/common';
import { IncomeRow } from './notion.entity';
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
    let incomeId = 0;
    response.results.forEach((row) => {
      console.log(row.properties);
      const incomeRow = new IncomeRow();
      incomeRow.paymentMethod = incomeId.toString();
      incomeRow.currency = 'NZD';
      income.push(incomeRow);
      incomeId += 1;
    });
    return income;
  }
}
