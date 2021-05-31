import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { PaymentService } from 'src/stripe/stripe.service';
import { PaymentModule } from 'src/stripe/stripe.module';
import { StripeModule } from 'nestjs-stripe'
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

config();


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    PaymentModule, StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    })
  ],
  providers: [UsersService, PaymentService],
  controllers: [UsersController],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
