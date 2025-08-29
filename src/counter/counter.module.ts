import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';
import { CounterServices } from 'src/counter-service/counter-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Counter, CounterServices])],
    exports: [TypeOrmModule],
    controllers: [CounterController],
    providers: [CounterService]
})
export class CounterModule { }
