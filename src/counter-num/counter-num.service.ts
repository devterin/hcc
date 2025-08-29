import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CounterNum, CounterStatus } from './counter-num.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { Counter } from 'src/counter/counter.entity';
import { User } from 'src/users/user.entity';
import { CreateCounterNumDto } from './dto/create-cn.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CounterNumService {
    constructor(
        @InjectRepository(CounterNum) private readonly counterNumRepo: Repository<CounterNum>,
        @InjectRepository(Counter) private readonly counterRepo: Repository<Counter>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    async create(dto: CreateCounterNumDto): Promise<CounterNum> {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        const counter = await this.counterRepo.findOne({
            where: { id: dto.counterId }, relations: ['services']
        });
        if (!user || !counter) throw new NotFoundException('User or Counter not found');

        const last = await this.counterNumRepo.findOne({
            where: { counter_id: { id: dto.counterId } },
            order: { num: 'DESC' },
        });
        const num = last ? last?.num + 1 : 1;

        const counterNum = this.counterNumRepo.create({
            num,
            status: CounterStatus.Waiting,
            user,
            counter_id: counter,
        });
        return this.counterNumRepo.save(counterNum);
    }

    findAll() {
        return this.counterNumRepo.find({
            select: ['num', 'status'],
            relations: ['counter_id']
        });
    }

    async findQueueByCounter(counterId: number): Promise<CounterNum[]> {
        return this.counterNumRepo.find({
            where: { counter_id: { id: counterId } },
            order: { created_at: 'ASC' },
            relations: ['user', 'counter_id']
        });
    }

    async updateStatus(id: number, status: CounterStatus): Promise<CounterNum> {
        const cn = await this.counterNumRepo.findOne({ where: { id } });
        if (!cn) throw new NotFoundException(`CounterNum with id ${id} not found`);
        cn.status = status;
        return this.counterNumRepo.save(cn);
    }

    async findByCounterNumId(id: number) {
        const cn = await this.counterNumRepo.findOne({
            where: { id },
            relations: ['user', 'counter_id']
        });
        if (!cn) throw new NotFoundException(`CounterNum with id ${id} not found`);
        return cn;
    }
}
