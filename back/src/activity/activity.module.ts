import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Activity } from './activity.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [JwtModule]
})
export class ActivityModule {}
