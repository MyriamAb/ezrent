import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesService],
  controllers: [PicturesController]
})
export class PicturesModule {}
