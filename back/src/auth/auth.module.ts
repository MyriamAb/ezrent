import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PaymentModule } from 'src/stripe/stripe.module';
import { StripeModule } from 'nestjs-stripe';
import { PaymentService } from 'src/stripe/stripe.service';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    PaymentModule, StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PaymentService],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}