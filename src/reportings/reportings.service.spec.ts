import { Test, TestingModule } from '@nestjs/testing';
import { ReportingsService } from './reportings.service';

describe('ReportingsService', () => {
  let service: ReportingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportingsService],
    }).compile();

    service = module.get<ReportingsService>(ReportingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
