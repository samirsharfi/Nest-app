import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import config from 'keys/config';
import { AuthGuard } from './auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ReportsModule } from './reports/reports.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || config.mongoUri),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    ReportsModule,

    ThrottlerModule.forRoot([{
      ttl: 120000,
      limit: 100,
    }]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
