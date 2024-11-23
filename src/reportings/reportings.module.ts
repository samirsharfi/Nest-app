import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reporting, ReportingSchema } from '../schemas/reporting.schema';
import { ReportingsService } from './reportings.service';
import { ReportingsController } from './reportings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reporting.name, schema: ReportingSchema },
    ]),
  ],
  controllers: [ReportingsController],
  providers: [ReportingsService],
  exports: [ReportingsService],
})
export class ReportingsModule {}
