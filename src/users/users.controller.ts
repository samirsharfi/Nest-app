import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { ActiveUsersQueryDto } from '../dto/active-users.dto';
import { ActiveUserResponseDto } from '../dto/active-users.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('active')
  @UseGuards(AuthGuard)
  async getActiveUsers(@Query() query: ActiveUsersQueryDto) {
    const timeRange = query.timeRange || 24; // Default to 24 hours
    const activeUsers = await this.usersService.getActiveUsers(timeRange);

    // Transform the response to the DTO
    return plainToInstance(ActiveUserResponseDto, activeUsers, {
      excludeExtraneousValues: true,
    });
  }
}
