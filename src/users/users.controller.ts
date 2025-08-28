import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    createUser(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @Get('search')
    async searchUserByPhone(
        @Query('q') q: string,
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '10',
    ) {
        const pageNumber = parseInt(page, 10);
        const pageSizeNum = parseInt(pageSize, 10);

        return this.userService.searchByPhone(
            pageNumber,
            pageSizeNum,
            q
        );
    }

    @Get(':id')
    findUserById(@Param('id') id: number) {
        return this.userService.findById(id);
    }
}

