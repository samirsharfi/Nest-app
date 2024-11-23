import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportingsService } from './reportings.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('reports')
export class ReportingsController {
  constructor(private readonly reportingsService: ReportingsService) {}

  @Get('omg-users')
  @UseGuards(AuthGuard) // Secure the endpoint with JWT authentication
  async getOmgUserReportCounts() {
    return await this.reportingsService.getOmgUserReportCounts();
  }
}
