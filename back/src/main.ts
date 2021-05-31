import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
    );
    const express = require('express');
    app.use(express.json({limit: '50mb'}))
    app.use(express.urlencoded({limit: '50mb', extended: true}))
    app.enableCors();
  await app.listen(5000);
}
bootstrap();