import { Module } from '@nestjs/common';
import { IncomeResolver } from './income.resolver';
import { IncomeService } from './income.service';

@Module({
  imports: [IncomeModule],
  providers: [IncomeService, IncomeResolver],
})
export class IncomeModule {}
