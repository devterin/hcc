import { Test, TestingModule } from '@nestjs/testing';
import { CounterNumController } from './counter-num.controller';

describe('CounterNumController', () => {
  let controller: CounterNumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounterNumController],
    }).compile();

    controller = module.get<CounterNumController>(CounterNumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
