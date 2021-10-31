// import { PrismaClient, Expense } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   let cursor = undefined;
//   while (true) {
//     const { results, next_cursor } = await this.notionClient.databases.query({
//       database_id: this.notionExpensesDbId,
//       start_cursor: cursor,
//     });
//     results.forEach((row) => {
//       const expenseItem: Expense = await prisma.expense.create({
//         item: row.properties['Item']['title'][0].plain_text,
//         amount: row.properties['Amount']['number'],
//         date: row.properties['Date']['date']['start'],
//         type: row.properties['Type']['select'].name,
//         subType: row.properties['Sub-type']['select'].name,
//       });
//       console.log({ expenseItem });
//     });
//     if (!next_cursor) {
//       break;
//     }
//     cursor = next_cursor;
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
