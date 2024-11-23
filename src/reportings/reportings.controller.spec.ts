import { Test, TestingModule } from '@nestjs/testing';
import { ReportingsController } from './reportings.controller';

describe('ReportingsController', () => {
  let controller: ReportingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportingsController],
    }).compile();

    controller = module.get<ReportingsController>(ReportingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
