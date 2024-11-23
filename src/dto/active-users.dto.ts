import { IsOptional, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ActiveUsersQueryDto {
  @IsOptional()
  @Type(() => Number) // Transform the query parameter to a number
  @IsNumber({}, { message: 'timeRange must be a number in hours' })
  timeRange?: number;
}

export class ActiveUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  lastActivity: Date;
}
