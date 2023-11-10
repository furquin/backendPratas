import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { CreateStoreDto } from './dto/create-store.dto'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { UserPresenter } from '../users/presenters/user.presenter'

@Injectable()
export class StoreService {
	constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}

	async create(data: CreateStoreDto): Promise<UserPresenter> {
		data.password = await this.bcrypt.hash(data.password)
		return new UserPresenter(
			await this.prisma.user.create({
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
						connectOrCreate: {
							where: { name: data.storeName },
							create: { name: data.storeName },
						},
					},
				},
				include: {
					role: true,
					store: true,
				},
			})
		)
	}
}
