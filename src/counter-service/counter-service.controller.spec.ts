import { Test, TestingModule } from '@nestjs/testing';
import { CounterServiceController } from './counter-service.controller';

describe('ServiceController', () => {
  let controller: CounterServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounterServiceController],
    }).compile();

    controller = module.get<CounterServiceController>(CounterServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
