import { PrismaClient } from '@prisma/client';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import { NotionService } from '../src/notion/notion.service';
import { DbCount } from '@/notion/notion.dto';
dotenv.config({ path: __dirname + '/.env' });

const prisma = new PrismaClient();
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
const notionService: NotionService = new NotionService();

export const logExpensesData = async () => {
  const notionExpensesDbId = process.env.NOTION_EXPENSES_DATABASE_ID;
  const { results } = await notionClient.databases.query({
    database_id: notionExpensesDbId,
  });

  const expenses = results.map((row) => {
    return {
      notionId: row.id,
      amount: row.properties['Amount']['number'],
      currency: row.properties['Currency']['select'].name,
      date: row.properties['Date']['date'].start,
      item: row.properties['Item']['title'][0].text.content,
      type: row.properties['Type']['select'].name,
      subType: row.properties['Sub-type']['select'].name,
      paymentType: row.properties['Payment Type']['select'].name,
    };
  });
  console.table(expenses);
};

export const logIncomeData = async () => {
  const notionIncomeDbId = process.env.NOTION_INCOME_DATABASE_ID;
  const { results } = await notionClient.databases.query({
    database_id: notionIncomeDbId,
  });

  const incomes = results.map((row) => {
    return {
      notionId: row.id,
      paymentMethod: row.properties['Payment Method']['select'].name,
      paidBy: row.properties['Paid By']['select'].name,
      incomeType: row.properties['Income Type']['select'].name,
      amount: row.properties['Amount']['number'],
      currency: row.properties['Currency']['select'].name,
      date: row.properties['Date']['date'].start,
    };
  });
  console.table(incomes);
};

export async function seedExpensesTable() {
  const notionExpensesDbId = process.env.NOTION_EXPENSES_DATABASE_ID;
  let cursor = undefined;
  const allExpenses = [];
  while (true) {
    const { results, next_cursor } = await notionClient.databases.query({
      database_id: notionExpensesDbId,
      start_cursor: cursor,
    });

    results.forEach(async (row) => {
      const expenseItem = {
        notionId: row.id,
        amount: row.properties['Amount']['number'],
        currency: row.properties['Currency']['select'].name,
        date: new Date(row.properties['Date']['date'].start),
        item: row.properties['Item']['title'][0].text.content,
        type: row.properties['Type']['select'].name,
        subType: row.properties['Sub-type']['select'].name,
        paymentType: row.properties['Payment Type']['select'].name,
      };
      allExpenses.push(expenseItem);
    });
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  const seeding = allExpenses.map(
    async (e) => await prisma.expense.create({ data: e }),
  );
  const promisedSeeding = Promise.all(seeding);
  console.log(
    `Expenses seeding done for all ${(await promisedSeeding).length} rows`,
  );
}

export const seedIncomeTable = async () => {
  const notionIncomeDbId = process.env.NOTION_INCOME_DATABASE_ID;
  let cursor = undefined;
  const allIncome = [];
  while (true) {
    const { results, next_cursor } = await notionClient.databases.query({
      database_id: notionIncomeDbId,
      start_cursor: cursor,
    });

    results.forEach(async (row) => {
      const incomeItem = {
        notionId: row.id,
        paymentMethod: row.properties['Payment Method']['select'].name,
        paidBy: row.properties['Paid By']['select'].name,
        incomeType: row.properties['Income Type']['select'].name,
        amount: row.properties['Amount']['number'],
        currency: row.properties['Currency']['select'].name,
        date: new Date(row.properties['Date']['date'].start),
      };
      allIncome.push(incomeItem);
    });
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  const seeding = allIncome.map(
    async (e) => await prisma.income.create({ data: e }),
  );
  const promisedSeeding = Promise.all(seeding);
  console.log(
    `Income seeding done for all ${(await promisedSeeding).length} rows`,
  );
  console.table(allIncome);
};

export const seedNewIncome = async () => {
  const notionIncomeDbId = process.env.NOTION_INCOME_DATABASE_ID;
  let cursor = undefined;
  while (true) {
    const { results, next_cursor } = await notionClient.databases.query({
      database_id: notionIncomeDbId,
      start_cursor: cursor,
    });

    results.forEach(async (row) => {
      const notionId = row.id;
      const res: DbCount = await notionService.incomeExistsInDb(notionId);
      if (res._count.notionId === 0) {
        const incomeItem = {
          notionId: row.id,
          paymentMethod: row.properties['Payment Method']['select'].name,
          paidBy: row.properties['Paid By']['select'].name,
          incomeType: row.properties['Income Type']['select'].name,
          amount: row.properties['Amount']['number'],
          currency: row.properties['Currency']['select'].name,
          date: new Date(row.properties['Date']['date'].start),
        };
        await prisma.income.create({ data: incomeItem });
      }
    });
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
};

seedNewIncome()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export const clearAllIncome = async () => {
  await prisma.income.deleteMany();
};

export const clearAllExpenses = async () => {
  await prisma.expense.deleteMany();
};
