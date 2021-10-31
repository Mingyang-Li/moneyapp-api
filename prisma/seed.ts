import { PrismaClient } from '@prisma/client';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const prisma = new PrismaClient();
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
const notionExpensesDbId = process.env.NOTION_EXPENSES_DATABASE_ID;

async function main() {
  let cursor = undefined;
  const allExpenses = [];
  while (true) {
    const { results, next_cursor } = await notionClient.databases.query({
      database_id: notionExpensesDbId,
      start_cursor: cursor,
    });

    results.forEach(async (row) => {
      const expenseItem = {
        item: row.properties['Item']['title'][0].plain_text,
        amount: row.properties['Amount']['number'],
        currency: row.properties['Currency']['select'].name,
        type: row.properties['Type']['select'].name,
        subType: row.properties['Sub-type']['select'].name,
        paymentType: row.properties['Payment Type']['select'].name,
        date: new Date(row.properties['Date']['date']['start']),
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
  console.log(promisedSeeding);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
