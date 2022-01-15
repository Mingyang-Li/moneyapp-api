import { Module } from '@nestjs/common';
import { ExpensesResolver } from './expenses.resolver';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [ExpensesModule],
  providers: [ExpensesResolver, ExpensesService],
})
export class ExpensesModule {}
