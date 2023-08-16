import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { GuardRoute } from 'src/common/guards/auth.guard'
import { IUser } from 'src/interfaces/user.interface'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: CreateUserDto) {
		return this.usersService.create(data)
	}

	@Get()
	@GuardRoute()
	findAll(): Promise<IUser[]> {
		return this.usersService.findAll()
	}

	@Get('/:id')
	findOne(@Param('id') id: number): Promise<IUser> {
		return this.usersService.findOne(Number(id))
	}

	@Delete('/:id')
	remove(@Param('id') id: number) {
		return this.usersService.remove(Number(id))
	}
}
