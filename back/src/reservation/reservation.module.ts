import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity'


@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User])],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}