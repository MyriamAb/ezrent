import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe'
import { PaymentService } from './stripe.service'
import { PaymentController } from './stripe.controller'
import { config } from 'dotenv';

config();

@Module({
    imports: [ StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    })],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService]
})

export class PaymentModule {}