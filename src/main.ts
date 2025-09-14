//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { PaymentService } from './payment/payment.service';

//main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // For Stripe webhooks: the body must be raw
  app.use('/payment/webhook', bodyParser.raw({ type: 'application/json' }));
// Mount a plain Express handler here
  // app.getHttpAdapter().getInstance().post('/payment/webhook', (req, res) => {
  //   app.get(PaymentService).handleWebhook(req) // resolve your service
  //     .then(result => res.send(result))
  //     .catch(err => {
  //       console.error(err);
  //       res.status(400).send(`Webhook error: ${err.message}`);
  //     });
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true,
      transform: true,
      transformOptions: { enableImplicitConversion: true},
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
