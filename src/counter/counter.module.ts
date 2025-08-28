import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';

@Module({
    imports: [TypeOrmModule.forFeature([Counter])],
    exports: [TypeOrmModule],
    controllers: [CounterController],
    providers: [CounterService]
})
export class CounterModule { }
