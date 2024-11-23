import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { AuthGuard } from './auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ReportingsController } from './reportings/reportings.controller';
import { ReportingsModule } from './reportings/reportings.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://live_reader:boomboom@live.wjxq2.mongodb.net/gurulytics?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    ReportingsModule,
  ],
  controllers: [AppController, ReportingsController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
