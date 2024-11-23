import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reporting } from '../schemas/reporting.schema';

@Injectable()
export class ReportingsService {
  constructor(
    @InjectModel(Reporting.name)
    private readonly reportingModel: Model<Reporting>,
  ) {}

  async getOmgUserReportCounts(): Promise<any[]> {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    const result = await this.reportingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }, // Match reports within the current year
        },
      },
      {
        $lookup: {
          from: 'users', // Name of the users collection
          localField: 'userId', // Field in reporting referencing users
          foreignField: '_id', // Field in users collection
          as: 'user', // Output array field
        },
      },
      {
        $unwind: '$user', // Deconstruct the user array
      },
      {
        $match: {
          'user.group': 'OMG', // Match users in the "OMG" group
        },
      },
      {
        $group: {
          _id: '$userId',
          reportCount: { $sum: 1 }, // Count reports per user
          user: { $first: '$user' }, // Include user details
        },
      },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          email: '$user.email',
          reportCount: 1,
        },
      },
    ]);

    return result;
  }
}
