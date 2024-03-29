import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserPresenter } from './presenters/user.presenter'
import { IUser } from './interfaces/user.interface'
import { AuthPresenter } from '../auth/presenters/auth.presenter'
import { Prisma } from '@prisma/client'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}

	async create(auth: AuthPresenter, data: CreateUserDto): Promise<UserPresenter> {
		data.password = await this.bcrypt.hash(data.password)
		const user = await this.prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
				role: {
					connect: {
						id: data.roleId,
					},
				},
				store: {
					connect: {
						id: auth.user.store.id,
					},
				},
			},
			include: {
				role: true,
				store: true,
			},
		})
		return new UserPresenter(user)
	}
	async findAll(auth: AuthPresenter, data?: string): Promise<UserPresenter[]> {
		const query: Prisma.UserFindManyArgs = {
			include: {
				role: true,
				store: true,
			},
		}

		if (auth.user.role.slug !== 'admin_sistema') {
			query.where = {
				storeId: auth.user.store.id,
			}
		}

		if (data) {
			query.where = {
				OR: [{ name: { contains: data } }, { email: { contains: data } }, { role: { name: { contains: data } } }],
			}
		}
		const users = await this.prisma.user.findMany({
			where: query.where,
			include: query.include,
		})
		return users.map((user) => new UserPresenter(user))
	}
	async findOne(id: number, auth?: AuthPresenter): Promise<UserPresenter> {
		const query: Prisma.UserFindFirstArgs = {
			where: {
				id,
			},
			include: {
				role: true,
				store: true,
			},
		}

		if (auth && auth?.user.role.slug !== 'admin_sistema') {
			query.where.storeId = auth?.user.store.id
		}

		const user = await this.prisma.user.findFirst({
			where: query.where,
			include: query.include,
		})
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		return new UserPresenter(user)
	}
	async findByEmail(email: string): Promise<IUser> {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			},
			include: {
				role: true,
				store: true,
			},
		})
		return user
	}
	async remove(auth: AuthPresenter, id: number): Promise<string> {
		let user
		if (auth.user.role.slug !== 'admin_sistema') {
			user = await this.prisma.user.findFirst({
				where: {
					id,
					storeId: auth.user.store.id,
				},
			})
		} else {
			user = await this.prisma.user.findFirst({
				where: {
					id,
				},
			})
		}

		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

		await this.prisma.user.delete({
			where: {
				id,
			},
		})

		return 'User deleted'
	}
	async update(auth: AuthPresenter, id: number, data: UpdateUserDto): Promise<UserPresenter> {
		let user
		if (auth.user.role.slug !== 'admin_sistema') {
			user = await this.prisma.user.findFirst({
				where: {
					id,
					storeId: auth.user.store.id,
				},
			})
		} else {
			user = await this.prisma.user.findFirst({
				where: {
					id,
				},
			})
		}
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

		const updatedUser = await this.prisma.user.update({
			where: {
				id,
			},
			data: {
				name: data.name,
				active: data.active,
				role: {
					connect: {
						id: data.roleId,
					},
				},
			},
			include: {
				role: true,
				store: true,
			},
		})

		return new UserPresenter(updatedUser)
	}
}
