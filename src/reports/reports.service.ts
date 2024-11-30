import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetReportsQueryDto } from './dto/report-counts.dto';
import { Report } from './schemas/report.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel('reportings') private reportModel: Model<Report>,
  ) {}

  async getReportCountByStatus(query: GetReportsQueryDto) {
    const { account_manager } = query;

   // Build the filter object dynamically based on the query params
  const filter: any = {};
  if (account_manager) {
    filter.account_manager = account_manager;
  }
  console.log('Filter:', filter); // Log the filter to debug

     // Aggregate reports by status for the specified account_manager
  const result = await this.reportModel.aggregate([
    { $match: filter }, // Filter by the provided query params
    {
      $group: {
        _id: '$status', // Group by status
        count: { $sum: 1 }, // Count reports for each status
      },
    },
  ]);
  // Transform the result into the desired format
  const response = result.reduce((acc, { _id, count }) => {
    acc[_id] = count;
    return acc;
  }, {});
  console.log(account_manager, result);
  
    return response;
  }
}
