import { Injectable } from '@nestjs/common/decorators';
import * as dotenv from 'dotenv';
import { PrismaClient } from '.prisma/client';
import {
  IncomeQueryParams,
  IncomeGroupQueryParam,
  IncomeAndExpensesSumParams,
  AverageIncomeExpenseQueryParams,
} from '@/notion/notion.dto';
import { IncomeRow } from './income.entity';
dotenv.config({ path: __dirname + '/.env' });

@Injectable()
export class IncomeService {
  constructor(private prisma = new PrismaClient()) {}

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

  public async incomeQueryByGroup(params: IncomeGroupQueryParam) {
    const { field, valueType } = params;
    switch (field) {
      case 'paymentMethod':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['paymentMethod'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['paymentMethod'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _count: {
              paymentMethod: true,
            },
          });
        }
      case 'paidBy':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['paidBy'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['paidBy'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _count: {
              paidBy: true,
            },
          });
        }
      case 'incomeType':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['incomeType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _sum: {
              amount: true,
            },
          });
        } else if (valueType === 'count') {
          return await this.prisma.income.groupBy({
            by: ['incomeType'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _count: {
              incomeType: true,
            },
          });
        }
      case 'currency':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['currency'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
              },
            },
            _sum: {
              amount: true,
            },
          });
        }
      case 'date':
        if (valueType === 'sum') {
          return await this.prisma.income.groupBy({
            by: ['date'],
            where: {
              date: {
                gte: params?.startDate,
                lte: params?.endDate,
              },
              incomeType: {
                not: 'Investment Cashout',
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
    }
  }

  public async incomeByDateRange(params: AverageIncomeExpenseQueryParams) {
    return await this.prisma.income.findMany({
      where: {
        date: {
          gte: params.startDate,
          lte: params.endDate,
        },
        incomeType: {
          not: 'Investment Cashout',
        },
      },
    });
  }

  public async incomeSumByDateRange(params: IncomeAndExpensesSumParams) {
    return await this.prisma.income.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: params.startDate,
          lte: params.endDate,
        },
        incomeType: {
          not: 'Investment Cashout',
        },
      },
    });
  }

  public async incomeExistsInDb(notionId: string) {
    return await this.prisma.income.aggregate({
      where: {
        notionId: notionId,
      },
      _count: {
        notionId: true,
      },
    });
  }
}
