import { Injectable } from '@nestjs/common';
import { IncomeRow } from './notion.entity';

@Injectable()
export class NotionService {
  async findAllIncome(): Promise<IncomeRow[]> {
    const incomeRow = new IncomeRow();
    incomeRow.id = 'test1';
    return [incomeRow];
  }
}
