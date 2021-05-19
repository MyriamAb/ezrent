import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RentalModule } from './rental/rental.module';
import { ReservationModule } from './reservation/reservation.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(
     
    ),
    RentalModule,
    ReservationModule,
    ActivityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
