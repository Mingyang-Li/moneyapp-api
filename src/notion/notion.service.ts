import { Injectable } from '@nestjs/common';
import { ExpenseRow } from './notion.entity';
import { ExpenseQueryParams } from './notion.dto';
import * as dotenv from 'dotenv';
import { PrismaClient } from '.prisma/client';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class NotionService {
  private prisma = new PrismaClient();

  async findAllIncome(): Promise<[]> {
    return [];
  }

  async findAllExpenses(params: ExpenseQueryParams): Promise<ExpenseRow[]> {
    return await this.prisma.expense.findMany({
      where: {
        id: params.id,
        date: params.date,
        amount: params.amount,
        currency: params.currency,
        item: {
          contains: params.item,
        },
        type: params.type,
        subType: params.subType,
        paymentType: params.paymentType,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
