import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RentalModule } from './rental/rental.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(
     
    ),
    RentalModule,
    ReservationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
