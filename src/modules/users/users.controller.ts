import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Auth, GuardRoute } from 'src/modules/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { UserPresenter } from './presenters/user.presenter'
import { AuthPresenter } from '../auth/presenters/auth.presenter'

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
	findAll(@Auth() auth: AuthPresenter): Promise<UserPresenter[]> {
		return this.usersService.findAll(auth)
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
}
