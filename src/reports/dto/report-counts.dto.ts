import { IsString, IsOptional, IsNotEmpty} from 'class-validator';

export class GetReportsQueryDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  account_manager?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
