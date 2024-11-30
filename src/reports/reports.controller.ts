import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetReportsQueryDto } from './dto/report-counts.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('counts')
  async getReportsCountByStatus(@Query() query: GetReportsQueryDto) {
    const result = await this.reportsService.getReportCountByStatus(query);
    return result;
  }
}
