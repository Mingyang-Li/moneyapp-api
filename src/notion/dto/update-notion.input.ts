import { CreateNotionInput } from './create-notion.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateNotionInput extends PartialType(CreateNotionInput) {
  id: number;
}
