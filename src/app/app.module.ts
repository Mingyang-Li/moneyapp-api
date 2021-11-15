import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from '../notion/notion.module';
import { AuthenticationMiddleware } from '@common/authentication.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GqlAuth0Module } from '../auth/gql-auth0.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    NotionModule,
    GqlAuth0Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.GET, path: '/api/get' },
        { method: RequestMethod.POST, path: '/api/post' },
        { method: RequestMethod.PUT, path: '/api/edit' },
        { method: RequestMethod.DELETE, path: '/api/delete' },
      );
  }
}
