import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CounterNumService } from './counter-num.service';
import { CreateCounterNumDto } from './dto/create-cn.dto';
import { CounterStatus } from './counter-num.entity';

@Controller('counter-num')
export class CounterNumController {
    constructor(private readonly counterNumService: CounterNumService) { }

    @Post()
    createCounterNum(@Body() dto: CreateCounterNumDto) {
        return this.counterNumService.create(dto);
    }

    @Get()
    findAll() {
        return this.counterNumService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.counterNumService.findByCounterNumId(id);
    }

    @Get('queue/:counterId')
    queue(@Param('counterId') counterId: number) {
        return this.counterNumService.findQueueByCounter(counterId);
    }

    @Patch('status/:id')
    updateStatus(@Param('id') id: number, @Body('status') status: CounterStatus) {
        return this.counterNumService.updateStatus(id, status);
    }
}
