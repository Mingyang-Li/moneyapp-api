import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from '@common/authentication.middleware';

@Module({
  imports: [],
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
