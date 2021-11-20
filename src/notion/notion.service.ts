import { Injectable } from '@nestjs/common';
import { ExpenseRow, IncomeRow } from './notion.entity';
import {
  ExpenseQueryParams,
  IncomeGroupQueryParam,
  IncomeQueryParams,
} from './notion.dto';
import * as dotenv from 'dotenv';
import { PrismaClient } from '.prisma/client';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class NotionService {
  private prisma = new PrismaClient();

  public async findAllIncome(params: IncomeQueryParams): Promise<IncomeRow[]> {
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
        date: params.sortDateBy,
      },
      take: params.count,
    });
  }

  public async findAllExpenses(
    params: ExpenseQueryParams,
  ): Promise<ExpenseRow[]> {
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
        date: params.sortDateBy,
      },
      take: params.count,
    });
  }

  public async incomeQueryByGroup(params: IncomeGroupQueryParam) {
    // console.table(params);
    const { field, valueType } = params;
    switch (field) {
      case 'paymentMethod':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['paymentMethod'],
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['paymentMethod'],
            _count: {
              paymentMethod: true,
            },
          });
        } else if (valueType === 'average') {
          return;
        }
      case 'paidBy':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['paidBy'],
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['paidBy'],
            _count: {
              paidBy: true,
            },
          });
        } else if (valueType === 'average') {
          return;
        }
      case 'incomeType':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['incomeType'],
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['incomeType'],
            _count: {
              incomeType: true,
            },
          });
        } else if (valueType === 'average') {
          return;
        }
      case 'date':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['date'],
            _sum: {
              amount: true,
            },
            orderBy: {
              date: 'desc',
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['date'],
            _count: {
              date: true,
            },
          });
        } else if (valueType === 'average') {
          return;
        }
    }
  }
}
