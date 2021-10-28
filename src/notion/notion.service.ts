import { Injectable } from '@nestjs/common';
import { CreateNotionInput } from './dto/create-notion.input';
import { UpdateNotionInput } from './dto/update-notion.input';

@Injectable()
export class NotionService {
  create(createNotionInput: CreateNotionInput) {
    return 'This action adds a new notion';
  }

  findAll() {
    return `This action returns all notion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notion`;
  }

  update(id: number, updateNotionInput: UpdateNotionInput) {
    return `This action updates a #${id} notion`;
  }

  remove(id: number) {
    return `This action removes a #${id} notion`;
  }
}
