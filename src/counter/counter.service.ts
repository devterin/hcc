import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateCounterDto } from './dto/create-counter.dto';
import { CounterServices } from 'src/counter-service/counter-service.entity';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Injectable()
export class CounterService {
    constructor(
        @InjectRepository(Counter)
        private readonly counterRepo: Repository<Counter>,
        @InjectRepository(CounterServices)
        private readonly counterServiceRepo: Repository<CounterServices>
    ) { }

    findAll() {
        return this.counterRepo.find({
            relations: ['services'],
        });
    }

    async create(dto: CreateCounterDto) {
        const existed = await this.counterRepo.findOne({ where: { name: dto.name } });
        if (existed) {
            throw new BadRequestException(`Counter with name ${dto.name} already exists`);
        }

        const counter = this.counterRepo.create({ name: dto.name });

        if (dto.serviceIds && dto.serviceIds.length > 0) {
            const services = await this.counterServiceRepo.find({
                where: { id: In(dto.serviceIds) }
            });
            if (services.length !== dto.serviceIds.length) {
                throw new NotFoundException('One or more services not found');
            }
            counter.services = services;
        }

        return this.counterRepo.save(counter);
    }

    async updateCounter(id: number, dto: UpdateCounterDto): Promise<Counter> {
        if (dto.name) {
            const existed = await this.counterRepo.findOne({
                where: {
                    name: dto.name,
                    id: Not(id)
                },
            });

            if (existed) {
                throw new BadRequestException(
                    `Counter with name ${dto.name} already exists`,
                );
            }
        }

        const counter = await this.counterRepo.findOne({
            where: { id },
            relations: ['services']
        });

        if (!counter) throw new NotFoundException(`Counter with id ${id} not found`);

        if (dto.name) counter.name = dto.name;

        if (dto.serviceIds && dto.serviceIds.length > 0) {
            const services = await this.counterServiceRepo.find({
                where: { id: In(dto.serviceIds) },
            });
            counter.services = services;
        }

        return this.counterRepo.save(counter);
    }

    async findById(id: number) {
        const counter = await this.counterRepo.findOne({
            where: { id },
            relations: ['services'],
        });

        if (!counter) throw new NotFoundException(`Counter with id ${id} not found`);

        return counter;
    }

    async removeCounter(id: number) {
        const counter = await this.counterRepo.findOneBy({ id: id });
        if (!counter) throw new NotFoundException(`Counter with id ${id} not found`);
        await this.counterRepo.remove(counter);
        return { message: `Counter with id ${id} has been deleted` };
    }

}
