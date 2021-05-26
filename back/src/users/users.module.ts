import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { PaymentService } from 'src/stripe/stripe.service';
import { PaymentModule } from 'src/stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PaymentModule],
  providers: [UsersService, PaymentService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
