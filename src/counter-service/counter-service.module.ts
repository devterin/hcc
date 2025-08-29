import { Module } from '@nestjs/common';
import { CounterServiceController } from './counter-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterServiceService } from './counter-service.service';
import { CounterServices } from './counter-service.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CounterServices])],
  exports: [TypeOrmModule],
  controllers: [CounterServiceController],
  providers: [CounterServiceService]
})
export class ServiceModule { }
