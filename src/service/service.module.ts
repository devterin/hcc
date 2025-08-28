import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  exports: [TypeOrmModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule { }
