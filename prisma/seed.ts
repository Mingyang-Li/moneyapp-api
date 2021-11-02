import { PrismaClient } from '@prisma/client';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const prisma = new PrismaClient();
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

async function seedIncomeTable() {
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
        date: row.created_time,
      };
      console.log(incomeItem);
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
  console.log(promisedSeeding);
}

seedIncomeTable()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
