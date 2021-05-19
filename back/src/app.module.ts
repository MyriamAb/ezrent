import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ReviewsModule,
    PicturesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
