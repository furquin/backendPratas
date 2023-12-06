import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Auth, GuardRoute } from 'src/modules/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { UserPresenter } from './presenters/user.presenter'
import { AuthPresenter } from '../auth/presenters/auth.presenter'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@GuardRoute('users.create')
	async create(@Auth() auth: AuthPresenter, @Body() data: CreateUserDto): Promise<UserPresenter> {
		return this.usersService.create(auth, data)
	}

	@Get()
	@GuardRoute('users.read')
	findAll(@Auth() auth: AuthPresenter, @Query('filter') filter: string): Promise<UserPresenter[]> {
		return this.usersService.findAll(auth, filter)
	}

	@Get('/:id')
	@GuardRoute('users.read')
	findOne(@Auth() auth: AuthPresenter, @Param('id') id: string): Promise<UserPresenter> {
		return this.usersService.findOne(+id, auth)
	}

	@Delete('/:id')
	@GuardRoute('users.delete')
	remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
		return this.usersService.remove(auth, +id)
	}

	@Patch('/:id')
	@GuardRoute('users.update')
	async update(
		@Auth() auth: AuthPresenter,
		@Param('id') id: string,
		@Body() data: UpdateUserDto
	): Promise<UserPresenter> {
		return this.usersService.update(auth, +id, data)
	}
}
