import { Test, TestingModule } from '@nestjs/testing';
import { CounterNumService } from './counter-num.service';

describe('CounterNumService', () => {
  let service: CounterNumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterNumService],
    }).compile();

    service = module.get<CounterNumService>(CounterNumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
