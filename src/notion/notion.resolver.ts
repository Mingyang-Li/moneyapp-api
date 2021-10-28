import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotionService } from './notion.service';
import { CreateNotionInput } from './dto/create-notion.input';
import { UpdateNotionInput } from './dto/update-notion.input';

@Resolver('Notion')
export class NotionResolver {
  constructor(private readonly notionService: NotionService) {}

  @Mutation('createNotion')
  create(@Args('createNotionInput') createNotionInput: CreateNotionInput) {
    return this.notionService.create(createNotionInput);
  }

  @Query('notion')
  findAll() {
    return this.notionService.findAll();
  }

  @Query('notion')
  findOne(@Args('id') id: number) {
    return this.notionService.findOne(id);
  }

  @Mutation('updateNotion')
  update(@Args('updateNotionInput') updateNotionInput: UpdateNotionInput) {
    return this.notionService.update(updateNotionInput.id, updateNotionInput);
  }

  @Mutation('removeNotion')
  remove(@Args('id') id: number) {
    return this.notionService.remove(id);
  }
}
