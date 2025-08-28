import { Module } from '@nestjs/common';
import { CounterNumService } from './counter-num.service';
import { CounterNumController } from './counter-num.controller';
import { CounterNum } from './counter-num.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CounterNum])],
  exports: [TypeOrmModule],
  controllers: [CounterNumController],
  providers: [CounterNumService]
})
export class CounterNumModule { }
