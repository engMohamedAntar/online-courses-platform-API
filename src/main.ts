//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { PaymentService } from './payment/payment.service';

//main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp = app.getHttpAdapter().getInstance();
  // For Stripe webhooks: the body must be raw
  expressApp.post(
    '/payment/webhook',
    bodyParser.raw({ type: 'application/json' }),
    (req, res) => {
      app
        .get(PaymentService)
        .handleWebhook(req)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    },
  );

  //moved the pipe to app.module to be visible for the test files
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted:true,
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true},
  //   }),
  // );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
