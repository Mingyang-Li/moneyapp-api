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
    return await this.prisma.income.findMany({
      where: {
        paymentMethod: {
          equals: params.paymentMethod,
          mode: 'insensitive',
        },
        paidBy: {
          equals: params.paidBy,
          mode: 'insensitive',
        },
        incomeType: {
          equals: params.incomeType,
          mode: 'insensitive',
        },
        date: params.date,
        currency: {
          equals: params.currency,
          mode: 'insensitive',
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findAllExpenses(params: ExpenseQueryParams): Promise<ExpenseRow[]> {
    return await this.prisma.expense.findMany({
      where: {
        id: params.id,
        date: params.date,
        amount: params.amount,
        currency: {
          equals: params.currency,
          mode: 'insensitive',
        },
        item: {
          contains: params.item,
          mode: 'insensitive',
        },
        type: {
          equals: params.type,
          mode: 'insensitive',
        },
        subType: {
          equals: params.subType,
          mode: 'insensitive',
        },
        paymentType: {
          equals: params.paymentType,
          mode: 'insensitive',
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
