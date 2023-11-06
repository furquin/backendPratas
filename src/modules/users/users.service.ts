import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserPresenter } from './presenters/user.presenter'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}

	async create(data: CreateUserDto): Promise<UserPresenter> {
		data.password = await this.bcrypt.hash(data.password)
		const user = await this.prisma.user.create({
			data,
		})
		return new UserPresenter(user)
	}
	async findAll(): Promise<UserPresenter[]> {
		const users = await this.prisma.user.findMany()
		return users.map((user) => new UserPresenter(user))
	}
	async findOne(id: number): Promise<UserPresenter> {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
			},
		})

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return new UserPresenter(user)
	}
	async findByEmail(email: string): Promise<IUser> {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			},
		})
		return user
	}
	async remove(id: number): Promise<string> {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
			},
		})

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

		await this.prisma.user.delete({
			where: {
				id,
			},
		})

		return 'User deleted'
	}
}
