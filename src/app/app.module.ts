import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from '../notion/notion.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      introspection: true,
      playground: true,
    }),
    NotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply()
      .forRoutes(
        { method: RequestMethod.GET, path: '/api/get' },
        { method: RequestMethod.POST, path: '/api/post' },
        { method: RequestMethod.PUT, path: '/api/edit' },
        { method: RequestMethod.DELETE, path: '/api/delete' },
      );
  }
}
