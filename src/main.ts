import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
