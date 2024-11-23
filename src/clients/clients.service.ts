import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../schemas/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async getClientsWithUsers(): Promise<any[]> {
    const clients = await this.clientModel.aggregate([
      {
        $lookup: {
          from: 'users', // Name of the users collection
          localField: 'users', // Field in clients referencing users
          foreignField: '_id', // Field in users that matches localField
          as: 'users', // Output array field
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          users: {
            $map: {
              input: '$users',
              as: 'user',
              in: {
                id: '$$user._id',
                name: '$$user.name',
                email: '$$user.email',
              },
            },
          },
        },
      },
    ]);

    return clients.map((client) => ({
      id: client._id,
      name: client.name,
      users: client.users,
    }));
  }
}
