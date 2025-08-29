import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CounterServices } from './counter-service.entity';

@Injectable()
export class CounterServiceService {

    constructor(
        @InjectRepository(CounterServices) private readonly counterServiceRepo: Repository<CounterServices>) { }

    create(dto: CreateServiceDto) {
        const service = this.counterServiceRepo.create({
            name: dto.name,
            description: dto.description || '',
        });
        return this.counterServiceRepo.save(service);
    }

    findAll() {
        return this.counterServiceRepo.find();
    }

    async findById(id: number) {
        const service = await this.counterServiceRepo.findOneBy({ id });
        if (!service) throw new NotFoundException('Service not found')
        return service;
    }

    async update(id: number, dto: UpdateServiceDto) {
        const service = await this.counterServiceRepo.findOneBy({ id });
        if (!service) throw new NotFoundException('Service not found');
        Object.assign(service, dto);
        return this.counterServiceRepo.save(service);
    }

    async remove(id: number) {
        const service = await this.counterServiceRepo.findOneBy({ id: id });
        if (!service) throw new NotFoundException('Service not found');
        await this.counterServiceRepo.remove(service);
        return { message: `Service with id ${id} has been deleted` }
    }
}
