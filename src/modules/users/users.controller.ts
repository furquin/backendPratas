import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { GuardRoute } from 'src/modules/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { UserPresenter } from './presenters/user.presenter'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@GuardRoute('users.create')
	async create(@Body() data: CreateUserDto): Promise<UserPresenter> {
		return this.usersService.create(data)
	}

	@Get()
	@GuardRoute('users.read')
	findAll(): Promise<UserPresenter[]> {
		return this.usersService.findAll()
	}

	@Get('/:id')
	@GuardRoute('users.read')
	findOne(@Param('id') id: string): Promise<UserPresenter> {
		return this.usersService.findOne(+id)
	}

	@Delete('/:id')
	@GuardRoute('users.delete')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
