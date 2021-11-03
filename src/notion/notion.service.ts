import { Injectable } from '@nestjs/common';
import { ExpenseRow, IncomeRow } from './notion.entity';
import { ExpenseQueryParams, IncomeQueryParams } from './notion.dto';
import * as dotenv from 'dotenv';
import { PrismaClient } from '.prisma/client';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class NotionService {
  private prisma = new PrismaClient();

  async findAllIncome(params: IncomeQueryParams): Promise<IncomeRow[]> {
    const { DATE_ASC, DATE_DESC } = params.orderBy;
    return await this.prisma.income.findMany({
      where: {
        paymentMethod: params.paymentMethod,
        paidBy: params.paidBy,
        incomeType: params.incomeType,
        date: params.date,
        currency: params.currency,
      },
      orderBy: {
        date: DATE_ASC.orderBy || DATE_DESC.orderBy,
      },
    });
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
