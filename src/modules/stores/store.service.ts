import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { CreateStoreDto } from './dto/create-store.dto'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { UserPresenter } from '../users/presenters/user.presenter'
import { JwtTokenService } from 'src/services/jwt/jwt.service'

@Injectable()
export class StoreService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly bcrypt: BcryptService,
		private readonly jwtService: JwtTokenService
	) {}

	async create(data: CreateStoreDto): Promise<{ user: UserPresenter; login: { token: string } }> {
		data.password = await this.bcrypt.hash(data.password)

		let store = await this.prisma.store.findUnique({
			where: {
				name: data.storeName,
			},
		})

		if (store) {
			throw new BadRequestException('Store already exists')
		}

		store = await this.prisma.store.create({
			data: {
				name: data.storeName,
			},
		})

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
						id: store.id,
					},
				},
			},
			include: {
				role: true,
				store: true,
			},
		})
		return {
			user: new UserPresenter(user),
			login: {
				token: this.jwtService.createToken(user.id),
			},
		}
	}
}
