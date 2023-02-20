import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/email')
  findOne(@Body('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Delete()
  remove(@Body('email') email: string) {
    return this.usersService.remove(email);
  }
}
