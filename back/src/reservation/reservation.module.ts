import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [JwtModule]

})
export class ReservationModule {}