import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.environment', // informando outro nome para o arquivo de configuração
      // ignoreEnvFile: true, // ignora as configurações do ConfigModule, exemplo para o heroku
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig], // usa o arquivo config/app.config.ts
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
