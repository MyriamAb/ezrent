import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe'
import { PaymentService } from './stripe.service'
import { PaymentController } from './stripe.controller'
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

config();

@Module({
    imports: [ StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    }),
  JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
  }),
  ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService, JwtModule]
})

export class PaymentModule {}