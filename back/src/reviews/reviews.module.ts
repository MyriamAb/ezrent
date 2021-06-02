import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Review]),
  JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
  }),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [JwtModule]
})
export class ReviewsModule {}
