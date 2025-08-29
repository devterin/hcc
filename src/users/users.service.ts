import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    create(data: CreateUserDto) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }
    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async searchByPhone(
        pageNumber: number,
        pageSize: number,
        phone_number?: string,
    ) {
        const [data, totalItems] = await this.userRepository.findAndCount({
            where: { phone_number: Like(`%${phone_number}%`) },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
        });

        const totalPages = Math.ceil(totalItems / pageSize);

        return { data, totalItems, totalPages, pageNumber, pageSize };
    }
}
