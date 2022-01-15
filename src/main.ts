import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 4000);

  console.log('===============================');
  console.log(`= 🚀 App running on port ${4000} =`);
  console.log('===============================');
}
bootstrap();
