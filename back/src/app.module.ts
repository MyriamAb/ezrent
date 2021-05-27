import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RentalModule } from './rental/rental.module';
import { ReservationModule } from './reservation/reservation.module';
import { ActivityModule } from './activity/activity.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PicturesModule } from './pictures/pictures.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';
import { StripeModule } from 'nestjs-stripe'
import { config } from 'dotenv';
import { PaymentModule } from './stripe/stripe.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    RentalModule,
    ReservationModule,
    ActivityModule,
    ReviewsModule,
    PicturesModule,
    AuthModule,
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    }),
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
