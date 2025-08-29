import { Module } from '@nestjs/common';
import { CounterNumService } from './counter-num.service';
import { CounterNumController } from './counter-num.controller';
import { CounterNum } from './counter-num.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from 'src/counter/counter.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CounterNum, Counter, User])],
  exports: [TypeOrmModule],
  controllers: [CounterNumController],
  providers: [CounterNumService]
})
export class CounterNumModule { }
