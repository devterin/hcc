import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller('counter')
export class CounterController {

    constructor(private readonly counterService: CounterService) { }

    @Post()
    create(@Body() dto: CreateCounterDto) {
        return this.counterService.create(dto);
    }

    @Get()
    findAll() {
        return this.counterService.findAll();
    }

    @Put(':id')
    updateCounter(@Param('id') id: number, @Body() dto: UpdateCounterDto) {
        return this.counterService.updateCounter(id, dto);
    }

    @Delete(':id')
    removeCounter(@Param('id') id: number) {
        return this.counterService.removeCounter(id);
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.counterService.findById(id);
    }

}
