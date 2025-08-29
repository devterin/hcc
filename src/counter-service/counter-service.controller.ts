import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { CounterServiceService } from './counter-service.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class CounterServiceController {
    constructor(private readonly counterService: CounterServiceService) { }

    @Post()
    create(@Body() dto: CreateServiceDto) {
        return this.counterService.create(dto);
    }

    @Get()
    findAll() {
        return this.counterService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
        return this.counterService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.counterService.remove(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.counterService.findById(id);
    }
}
