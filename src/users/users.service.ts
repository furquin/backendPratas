import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from 'src/interfaces/user.interface'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}

	async create(data: CreateUserDto): Promise<IUser> {
		data.password = await this.bcrypt.hash(data.password)
		const user = await this.prisma.user.create({
			data,
		})
		delete user.password
		return user
	}
	async findAll() {
		return await this.prisma.user.findMany()
	}
	async findOne(id: number): Promise<IUser> {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
			},
		})

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return user
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
