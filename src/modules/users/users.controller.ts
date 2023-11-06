import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { GuardRoute } from 'src/common/guards/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { UserPresenter } from './presenters/user.presenter'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: CreateUserDto): Promise<UserPresenter> {
		return this.usersService.create(data)
	}

	@Get()
	@GuardRoute()
	findAll(): Promise<UserPresenter[]> {
		return this.usersService.findAll()
	}

	@Get('/:id')
	findOne(@Param('id') id: string): Promise<UserPresenter> {
		return this.usersService.findOne(+id)
	}

	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
