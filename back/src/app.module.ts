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
import { StripeModule } from 'nestjs-stripe'

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
      apiKey: 'pk_test_51IsNySAQArDV5cBDQy5GSkkhHV2FX283JHxwG4L2XiUmWfnF4og6GSznds1vfnuho1svtriLC0uZMi93WnVL9sUq00vQPVDzMJ',
      apiVersion: '2020-08-27',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
