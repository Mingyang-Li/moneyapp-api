import {
  ExpenseQueryParams,
  ExpensesGroupQueryParam,
  IncomeAndExpensesSumParams,
} from '@/notion/notion.dto';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import { ExpenseRow } from './expenses.entity';

@Injectable()
export class ExpensesService {
  constructor(private prisma = new PrismaClient()) {}

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

  public async expensesQueryByGroup(params: ExpensesGroupQueryParam) {
    const { field, valueType } = params;
    switch (field) {
      case 'type':
        if (valueType === 'sum') {
          return await this.prisma.expense.groupBy({
            by: ['type'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.expense.groupBy({
            by: ['type'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _count: {
              type: true,
            },
          });
        }
      case 'subType':
        if (valueType === 'sum') {
          return await this.prisma.expense.groupBy({
            by: ['subType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.expense.groupBy({
            by: ['subType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _count: {
              subType: true,
            },
          });
        }
      case 'paymentType':
        if (valueType === 'sum') {
          return await this.prisma.expense.groupBy({
            by: ['paymentType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.expense.groupBy({
            by: ['paymentType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _count: {
              paymentType: true,
            },
          });
        }
      case 'date':
        if (valueType === 'sum') {
          return await this.prisma.expense.groupBy({
            by: ['date'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _sum: {
              amount: true,
            },
            orderBy: {
              date: 'asc',
            },
          });
        }
      case 'currency':
        if (valueType === 'sum') {
          return await this.prisma.expense.groupBy({
            by: ['currency'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
            },
            _sum: {
              amount: true,
            },
          });
        }
    }
  }

  public async expenseSumByDateRange(params: IncomeAndExpensesSumParams) {
    return await this.prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
    });
  }
}
